import { NotFoundError } from '@/shared/domain/errors';
import { MessageService } from '@/shared/infrastructure/services';

import { CategoryEntity } from '@/features/categories/domain/entities/category.entity';
import { CategoriesInMemoryRepository } from '@/features/categories/infrastructure/database/in-memory/repositories/categories-in-memory.repository';

import { MakeCategoryFactory } from '../../../../../../test/domain/factories';
import { GetCategoryByIdUseCase } from './get-category-by-id.usecase';

describe('GetCategoryByIdUseCase unit tests', () => {
  let categoriesRepository: CategoriesInMemoryRepository;
  let messageService: MessageService;
  let getCategoryByIdUseCase: GetCategoryByIdUseCase;

  beforeEach(() => {
    categoriesRepository = new CategoriesInMemoryRepository();
    messageService = new MessageService();
    getCategoryByIdUseCase = new GetCategoryByIdUseCase(
      categoriesRepository,
      messageService,
    );
  });

  it('should be able to get a category', async () => {
    const newCategory = CategoryEntity.create(MakeCategoryFactory({}));

    categoriesRepository.entities.push(newCategory);

    const { category } = await getCategoryByIdUseCase.execute({
      categoryId: newCategory.id,
    });

    expect(categoriesRepository.entities).toHaveLength(1);
    expect(category).toMatchObject(newCategory);
  });

  it('should not be able to get a non existing category', async () => {
    await expect(() =>
      getCategoryByIdUseCase.execute({ categoryId: 'fake-id' }),
    ).rejects.toThrow(new NotFoundError('Categoria não encontrada.'));
  });
});
