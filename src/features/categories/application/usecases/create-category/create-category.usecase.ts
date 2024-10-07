import { Injectable } from '@nestjs/common';

import { CategoryEntity } from '@/features/categories/domain/entities/category.entity';
import { CategoriesRepository } from '@/features/categories/domain/repositories/categories.repository';
import {
  ColorValueObject,
  NameValueObject,
} from '@/features/categories/domain/value-objects';

type CreateCategoryUseCaseRequest = {
  name: string;
  color: string;
  createdBy: string;
};

type CreateCategoryUseCaseResponse = Partial<CategoryEntity>;

@Injectable()
export class CreateCategoryUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  public async execute(
    request: CreateCategoryUseCaseRequest,
  ): Promise<CreateCategoryUseCaseResponse> {
    const { name, color, createdBy } = request;
    const category = CategoryEntity.create({
      name: NameValueObject.create(name),
      color: ColorValueObject.create(color),
      createdBy,
    });

    await this.categoriesRepository.create(category);

    return {
      id: category.id,
      createdAt: category.createdAt,
    };
  }
}
