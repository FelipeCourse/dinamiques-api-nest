import { Injectable } from '@nestjs/common';

import { CategoryEntity } from '@/features/categories/domain/entities/category.entity';
import { CategoriesRepository } from '@/features/categories/domain/repositories/categories.repository';

type GetAllCategoriesUseCaseRequest = {
  query?: string;
  page?: number;
  limit?: number;
};

type GetAllCategoriesUseCaseResponse = {
  categories: CategoryEntity[];
};

@Injectable()
export class GetAllCategoriesUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  public async execute(
    request: GetAllCategoriesUseCaseRequest,
  ): Promise<GetAllCategoriesUseCaseResponse> {
    const { query, page, limit } = request;
    const filter = query ? { name: query } : {};
    const categories = await this.categoriesRepository.getAll({
      filter,
      page,
      limit,
    });

    return {
      categories,
    };
  }
}
