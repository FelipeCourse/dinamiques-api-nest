import { BasePrismaRepository } from '@/shared/infrastructure/database/prisma/repositories/base-prisma.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma/services';
import { MessageService } from '@/shared/infrastructure/services';

import { TeacherEntity } from '@/features/teachers/domain/entities/teacher.entity';

import { TeacherPrismaMapper } from '../mappers/teacher-prisma.mapper';

export class TeachersPrismaRepository extends BasePrismaRepository<TeacherEntity> {
  constructor(prismaService: PrismaService, messageService: MessageService) {
    super(
      prismaService,
      messageService,
      'Teacher',
      TeacherPrismaMapper,
      'Docente',
    );
  }

  public override async create(entity: TeacherEntity): Promise<void> {
    await super.create(entity, 'name');
  }

  public override async update(
    entityId: string,
    updateEntity: TeacherEntity,
  ): Promise<void> {
    await super.update(entityId, updateEntity, 'name');
  }
}
