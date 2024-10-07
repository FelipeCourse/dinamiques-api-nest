import { CategoryEntity } from '@/features/categories/domain/entities/category.entity';

export class CategoryHttpMapper {
  static toHttp(category: CategoryEntity) {
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
