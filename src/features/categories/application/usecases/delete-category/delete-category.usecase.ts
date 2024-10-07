import { Injectable } from '@nestjs/common';

import { NotFoundError } from '@/shared/domain/errors';
import { GenderEnum } from '@/shared/enums';
import { MessageService } from '@/shared/infrastructure/services';

import { CategoriesRepository } from '@/features/categories/domain/repositories/categories.repository';

type DeleteCategoryUseCaseRequest = {
  categoryId: string;
};

type DeleteCategoryUseCaseResponse = void;

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly messageService: MessageService,
  ) {}

  public async execute(
    request: DeleteCategoryUseCaseRequest,
  ): Promise<DeleteCategoryUseCaseResponse> {
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

    await this.categoriesRepository.delete(categoryId);
  }
}
