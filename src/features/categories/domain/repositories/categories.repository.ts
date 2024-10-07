import { BaseRepository } from '@/shared/domain/repositories/base-repository';

import { CategoryEntity } from '../entities/category.entity';

export abstract class CategoriesRepository extends BaseRepository<CategoryEntity> {}
