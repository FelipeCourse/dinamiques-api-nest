import { BasePrismaRepository } from '@/shared/infrastructure/database/prisma/repositories/base-prisma.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma/services';
import { MessageService } from '@/shared/infrastructure/services';

import { CategoryEntity } from '@/features/categories/domain/entities/category.entity';

import { CategoryPrismaMapper } from '../mappers/category-prisma.mapper';

export class CategoriesPrismaRepository extends BasePrismaRepository<CategoryEntity> {
  constructor(prismaService: PrismaService, messageService: MessageService) {
    super(
      prismaService,
      messageService,
      'Category',
      CategoryPrismaMapper,
      'Categoria',
    );
  }

  public override async create(entity: CategoryEntity): Promise<void> {
    await super.create(entity, 'name');
  }

  public override async update(
    entityId: string,
    updateEntity: CategoryEntity,
  ): Promise<void> {
    await super.update(entityId, updateEntity, 'name');
  }

  public override async delete(entityId: string): Promise<void> {
    await super.delete(entityId, 'Categoria associada a um artigo.');
  }
}
