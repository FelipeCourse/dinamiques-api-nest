import { BaseInMemoryRepository } from '@/shared/infrastructure/database/in-memory/repositories/base-in-memory.repository';

import { CategoryEntity } from '@/features/categories/domain/entities/category.entity';

export class CategoriesInMemoryRepository extends BaseInMemoryRepository<CategoryEntity> {}
