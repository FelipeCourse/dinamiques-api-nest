import { NotFoundError } from '@/shared/domain/errors';
import { MessageService } from '@/shared/infrastructure/services';

import { CategoryEntity } from '@/features/categories/domain/entities/category.entity';
import { CategoriesInMemoryRepository } from '@/features/categories/infrastructure/database/in-memory/repositories/categories-in-memory.repository';

import { MakeCategoryFactory } from '../../../../../../test/domain/factories';
import { DeleteCategoryUseCase } from './delete-category.usecase';

describe('DeleteCategoryUseCase unit tests', () => {
  let categoriesRepository: CategoriesInMemoryRepository;
  let messageService: MessageService;
  let deleteCategoryUseCase: DeleteCategoryUseCase;

  beforeEach(() => {
    categoriesRepository = new CategoriesInMemoryRepository();
    messageService = new MessageService();
    deleteCategoryUseCase = new DeleteCategoryUseCase(
      categoriesRepository,
      messageService,
    );
  });

  it('should be able to delete a category', async () => {
    const category = CategoryEntity.create(MakeCategoryFactory({}));

    categoriesRepository.entities.push(category);
    expect(categoriesRepository.entities).toHaveLength(1);
    await deleteCategoryUseCase.execute({ categoryId: category.id });
    expect(categoriesRepository.entities).toHaveLength(0);
  });

  it('should not be able to delete a non existing category', async () => {
    await expect(() =>
      deleteCategoryUseCase.execute({ categoryId: 'fake-id' }),
    ).rejects.toThrow(new NotFoundError('Categoria não encontrada.'));
  });
});
