import { Injectable } from '@nestjs/common';

import { NotFoundError } from '@/shared/domain/errors';
import { GenderEnum } from '@/shared/enums';
import { MessageService } from '@/shared/infrastructure/services';

import { CategoriesRepository } from '@/features/categories/domain/repositories/categories.repository';
import {
  ColorValueObject,
  NameValueObject,
} from '@/features/categories/domain/value-objects';

type UpdateCategoryUseCaseRequest = {
  categoryId: string;
  name?: string;
  color?: string;
  isActive?: boolean;
  updatedBy: string;
};

type UpdateCategoryUseCaseResponse = void;

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly messageService: MessageService,
  ) {}

  public async execute(
    request: UpdateCategoryUseCaseRequest,
  ): Promise<UpdateCategoryUseCaseResponse> {
    const { categoryId, name, color, isActive, updatedBy } = request;
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

    category.name = name
      ? NameValueObject.create(name)
      : NameValueObject.create(category.name.value);
    category.color = color
      ? ColorValueObject.create(color)
      : ColorValueObject.create(category.color.value);
    category.isActive = isActive !== undefined ? isActive : category.isActive;
    category.updatedAt = new Date();
    category.updatedBy = updatedBy;

    await this.categoriesRepository.update(categoryId, category);
  }
}
