import { CategoryEntity } from '@/features/categories/domain/entities/category.entity';
import {
  ColorValueObject,
  NameValueObject,
} from '@/features/categories/domain/value-objects';
import { CategoriesInMemoryRepository } from '@/features/categories/infrastructure/database/in-memory/repositories/categories-in-memory.repository';

import { GetAllCategoriesUseCase } from './get-all-categories.usecase';

describe('GetAllCategoriesUseCase unit tests', () => {
  let categoriesRepository: CategoriesInMemoryRepository;
  let getAllCategoriesUseCase: GetAllCategoriesUseCase;

  beforeEach(() => {
    categoriesRepository = new CategoriesInMemoryRepository();
    getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoriesRepository);
  });

  it('should be able to get all categories with filters', async () => {
    const category1 = CategoryEntity.create({
      name: NameValueObject.create('Teste Categoria 1'),
      color: ColorValueObject.create('#333'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });
    const category2 = CategoryEntity.create({
      name: NameValueObject.create('Teste Categoria 2'),
      color: ColorValueObject.create('#444'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });

    categoriesRepository.entities.push(category1, category2);

    const query = 'Teste';
    const page = 1;
    const limit = 10;
    const { categories } = await getAllCategoriesUseCase.execute({
      query,
      page,
      limit,
    });

    expect(categories).toHaveLength(2);
    expect(categories).toEqual(expect.arrayContaining([category1, category2]));
  });

  it('should be able to get all categories without filters', async () => {
    const category1 = CategoryEntity.create({
      name: NameValueObject.create('Teste Categoria 1'),
      color: ColorValueObject.create('#333'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });
    const category2 = CategoryEntity.create({
      name: NameValueObject.create('Teste Categoria 2'),
      color: ColorValueObject.create('#444'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });

    categoriesRepository.entities.push(category1, category2);

    const { categories } = await getAllCategoriesUseCase.execute({});

    expect(categories).toHaveLength(2);
    expect(categories).toEqual(expect.arrayContaining([category1, category2]));
  });

  it('should be able to return empty list if no categories match the query', async () => {
    const category = CategoryEntity.create({
      name: NameValueObject.create('Teste Categoria 1'),
      color: ColorValueObject.create('#333'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });

    categoriesRepository.entities.push(category);

    const { categories } = await getAllCategoriesUseCase.execute({
      query: 'non-existing query',
    });

    expect(categories).toHaveLength(0);
  });
});
