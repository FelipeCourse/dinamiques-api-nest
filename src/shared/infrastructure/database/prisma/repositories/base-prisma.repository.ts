import { Prisma } from '@prisma/client';

import { BaseEntity } from '@/shared/domain/entities/base-entity';
import { ConflictError } from '@/shared/domain/errors';
import { BaseRepository } from '@/shared/domain/repositories/base-repository';
import { GenderEnum } from '@/shared/enums';
import { MessageService } from '@/shared/infrastructure/services';
import { QueryType } from '@/shared/types';

import { PrismaService } from '../services';

interface ModelMapper<T> {
  toDomain(raw: any): T;
  toPrisma(entity: T): any;
}

export abstract class BasePrismaRepository<T extends BaseEntity<any>>
  implements BaseRepository<T>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly messageService: MessageService,
    private readonly modelName: string,
    protected readonly modelMapper: ModelMapper<T>,
    private readonly resourceName: string,
  ) {}

  protected get client() {
    return this.prismaService[this.modelName];
  }

  private getMappedFieldValue(
    entity: T,
    uniqueField: keyof T,
  ): string | undefined {
    const mappedEntity = this.modelMapper.toPrisma(entity);

    return mappedEntity[uniqueField]?.toLowerCase();
  }

  private throwConflictError(): ConflictError {
    const { message } = this.messageService.handleMessage({
      messageType: 'error',
      resource: this.resourceName,
      action: 'existingConflict',
      gender: GenderEnum.MALE,
    });

    throw new ConflictError(message);
  }

  private async fieldValueExists(
    fieldValue: string,
    uniqueField: keyof T,
  ): Promise<boolean> {
    const existingEntity = await this.client.findFirst({
      where: {
        [uniqueField]: {
          equals: fieldValue,
          mode: 'insensitive',
        },
      },
    });

    return !!existingEntity;
  }

  private async checkForConflict(
    fieldValue: string,
    uniqueField: keyof T,
  ): Promise<void> {
    const isFieldValueExists = await this.fieldValueExists(
      fieldValue,
      uniqueField,
    );

    if (isFieldValueExists) {
      throw this.throwConflictError();
    }
  }

  private async checkForUpdateConflict(
    entityId: string,
    mappedFieldValue: string,
    uniqueField: keyof T,
  ): Promise<void> {
    const existingEntity = await this.client.findUnique({
      where: { id: entityId },
    });

    if (!existingEntity) {
      return;
    }

    const existingFieldValue = existingEntity[uniqueField]?.toLowerCase();

    if (existingFieldValue !== mappedFieldValue) {
      await this.checkForConflict(mappedFieldValue, uniqueField);
    }
  }

  private async validEntityFieldValueConflictError(
    entity: T,
    uniqueField: keyof T,
    entityId?: string,
  ): Promise<void> {
    const mappedFieldValue = this.getMappedFieldValue(entity, uniqueField);

    if (!mappedFieldValue) {
      throw this.throwConflictError();
    }

    if (!entityId) {
      await this.checkForConflict(mappedFieldValue, uniqueField);

      return;
    }

    await this.checkForUpdateConflict(entityId, mappedFieldValue, uniqueField);
  }

  public async create(entity: T, uniqueField: keyof T): Promise<void> {
    await this.validEntityFieldValueConflictError(entity, uniqueField);
    await this.client.create({ data: this.modelMapper.toPrisma(entity) });
  }

  public async getAll({ page = 1, limit = 10 }: QueryType): Promise<T[]> {
    const resources = await this.client.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    const mappedResources = resources.map((resource: T) =>
      this.modelMapper.toDomain(resource),
    );

    return mappedResources;
  }

  public async getById(entityId: string): Promise<T | null> {
    const resource = await this.client.findUnique({
      where: { id: entityId },
    });

    if (!resource) {
      return null;
    }

    const mappedResource = this.modelMapper.toDomain(resource);

    return mappedResource;
  }

  public async update(
    entityId: string,
    updateEntity: T,
    uniqueField: keyof T,
  ): Promise<void> {
    const resource = await this.client.findUnique({
      where: { id: entityId },
    });

    if (!resource) {
      return;
    }

    await this.validEntityFieldValueConflictError(
      updateEntity,
      uniqueField,
      entityId,
    );

    await this.client.update({
      data: this.modelMapper.toPrisma(updateEntity),
      where: {
        id: entityId,
      },
    });
  }

  public async delete(
    entityId: string,
    relationalConflictMessage: string,
  ): Promise<void> {
    try {
      await this.client.delete({ where: { id: entityId } });
    } catch (error: unknown) {
      if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
        throw error;
      }

      switch (error.code) {
        case 'P2003':
          throw new ConflictError(relationalConflictMessage);
        default:
      }
    }
  }

  public async softDelete(entityId: string): Promise<void> {
    await this.client.update({
      where: { id: entityId },
      data: { isActive: false },
    });
  }
}
