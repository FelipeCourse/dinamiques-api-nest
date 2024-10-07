import { Prisma, Category as CategoryPrisma } from '@prisma/client';

import { CategoryEntity } from '@/features/categories/domain/entities/category.entity';
import {
  ColorValueObject,
  NameValueObject,
} from '@/features/categories/domain/value-objects';

export class CategoryPrismaMapper {
  public static toDomain(raw: CategoryPrisma): CategoryEntity {
    return CategoryEntity.create(
      {
        name: NameValueObject.create(raw.name),
        color: ColorValueObject.create(raw.color),
        isActive: raw.isActive,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        createdBy: raw.createdBy,
        updatedBy: raw.updatedBy,
      },
      raw.id,
    );
  }

  public static toPrisma(
    category: CategoryEntity,
  ): Prisma.CategoryUncheckedCreateInput {
    return {
      id: category.id,
      name: category.name.value,
      color: category.color.value,
      isActive: category.isActive,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      createdBy: category.createdBy,
      updatedBy: category.updatedBy,
    };
  }
}
