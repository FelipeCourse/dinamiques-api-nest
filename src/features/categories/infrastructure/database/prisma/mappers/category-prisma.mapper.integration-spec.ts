import { Category as CategoryPrisma } from '@prisma/client';

import { CategoryEntity } from '@/features/categories/domain/entities/category.entity';
import {
  ColorValueObject,
  NameValueObject,
} from '@/features/categories/domain/value-objects';
import { CategoryPrismaMapper } from '@/features/categories/infrastructure/database/prisma/mappers/category-prisma.mapper';

describe('CategoryPrismaMapper integration tests', () => {
  it('should be able to convert CategoryPrisma to CategoryEntity format', () => {
    const rawCategory: CategoryPrisma = {
      id: '324ec5d0-dc65-5602-a8e1-e485eda81589',
      name: 'Test Category',
      color: '#FFFFFF',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: '121cc5d0-dc65-5602-a8e1-e485eda81542',
      updatedBy: '744ec5d0-dc65-5602-a8e1-e485eda81581',
    };

    const categoryEntity = CategoryPrismaMapper.toDomain(rawCategory);

    expect(categoryEntity).toBeInstanceOf(CategoryEntity);
    expect(categoryEntity.id).toBe('324ec5d0-dc65-5602-a8e1-e485eda81589');
    expect(categoryEntity.name.value).toBe('Test Category');
    expect(categoryEntity.color.value).toBe('#FFFFFF');
    expect(categoryEntity.isActive).toBe(true);
    expect(categoryEntity.createdAt).toEqual(rawCategory.createdAt);
    expect(categoryEntity.updatedAt).toEqual(rawCategory.updatedAt);
    expect(categoryEntity.createdBy).toBe(
      '121cc5d0-dc65-5602-a8e1-e485eda81542',
    );
    expect(categoryEntity.updatedBy).toBe(
      '744ec5d0-dc65-5602-a8e1-e485eda81581',
    );
  });

  it('should be able to convert CategoryEntity to Prisma format', () => {
    const categoryEntity = CategoryEntity.create({
      name: NameValueObject.create('Test Category'),
      color: ColorValueObject.create('#FFFFFF'),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: '121cc5d0-dc65-5602-a8e1-e485eda81542',
      updatedBy: '744ec5d0-dc65-5602-a8e1-e485eda81581',
    });

    const prismaCategory = CategoryPrismaMapper.toPrisma(categoryEntity);

    expect(prismaCategory).toMatchObject({
      id: categoryEntity.id,
      name: 'Test Category',
      color: '#FFFFFF',
      isActive: true,
      createdAt: categoryEntity.createdAt,
      updatedAt: categoryEntity.updatedAt,
      createdBy: '121cc5d0-dc65-5602-a8e1-e485eda81542',
      updatedBy: '744ec5d0-dc65-5602-a8e1-e485eda81581',
    });
  });
});
