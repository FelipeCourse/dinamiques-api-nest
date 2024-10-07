import { CategoriesInMemoryRepository } from '@/features/categories/infrastructure/database/in-memory/repositories/categories-in-memory.repository';

import { CreateCategoryUseCase } from './create-category.usecase';

describe('CreateCategoryUseCase unit tests', () => {
  let categoriesRepository: CategoriesInMemoryRepository;
  let createCategoryUseCase: CreateCategoryUseCase;

  beforeEach(() => {
    categoriesRepository = new CategoriesInMemoryRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  });

  it('should be able to create a category', async () => {
    const category = await createCategoryUseCase.execute({
      name: 'Category test',
      color: '#ff1122',
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });

    expect(categoriesRepository.entities).toHaveLength(1);
    expect(categoriesRepository.entities[0].id).toEqual(category.id);
  });
});
