import { Injectable } from '@nestjs/common';

import { NotFoundError } from '@/shared/domain/errors';
import { GenderEnum } from '@/shared/enums';
import { MessageService } from '@/shared/infrastructure/services';

import { CategoryEntity } from '@/features/categories/domain/entities/category.entity';
import { CategoriesRepository } from '@/features/categories/domain/repositories/categories.repository';

type GetCategoryByIdUseCaseRequest = {
  categoryId: string;
};

type GetCategoryByIdUseCaseResponse = {
  category: CategoryEntity;
};

@Injectable()
export class GetCategoryByIdUseCase {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly messageService: MessageService,
  ) {}

  public async execute(
    request: GetCategoryByIdUseCaseRequest,
  ): Promise<GetCategoryByIdUseCaseResponse> {
    const { categoryId } = request;
    const category = await this.categoriesRepository.getById(categoryId);

    if (!category) {
      const { message } = this.messageService.handleMessage({
        messageType: 'error',
        resource: 'Categoria',
        action: 'notFound',
        gender: GenderEnum.FEMALE,
      });

      throw new NotFoundError(message);
    }

    return {
      category,
    };
  }
}
