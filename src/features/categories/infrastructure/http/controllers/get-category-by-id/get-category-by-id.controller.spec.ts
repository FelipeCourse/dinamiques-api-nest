import { Test, TestingModule } from '@nestjs/testing';

import { GetCategoryByIdUseCase } from '@/features/categories/application/usecases';
import { CategoryEntity } from '@/features/categories/domain/entities/category.entity';
import {
  ColorValueObject,
  NameValueObject,
} from '@/features/categories/domain/value-objects';

import { CategoryHttpMapper } from '../../mappers/category-http.mapper';
import { GetCategoryByIdController } from './get-category-by-id.controller';

describe('GetCategoryByIdController unit tests', () => {
  let getCategoryByIdController: GetCategoryByIdController;
  let getCategoryByIdUseCase: GetCategoryByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetCategoryByIdController],
      providers: [
        {
          provide: GetCategoryByIdUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: CategoryHttpMapper,
          useValue: {
            toHttp: jest.fn(),
          },
        },
      ],
    }).compile();

    getCategoryByIdController = module.get<GetCategoryByIdController>(
      GetCategoryByIdController,
    );
    getCategoryByIdUseCase = module.get<GetCategoryByIdUseCase>(
      GetCategoryByIdUseCase,
    );
  });

  it('should be able to define GetCategoryByIdUseCase', () => {
    expect(getCategoryByIdController).toBeDefined();
  });

  it('should be able to call getCategoryByIdUseCase and return the mapped category', async () => {
    const mockCategoryEntity = CategoryEntity.create({
      name: NameValueObject.create('Test Category'),
      color: ColorValueObject.create('#ffffff'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });
    const mockMappedCategory = {
      id: mockCategoryEntity.id,
      name: 'Test Category',
      color: '#ffffff',
      isActive: true,
      createdAt: expect.any(Date),
      updatedAt: undefined,
      createdBy: mockCategoryEntity.createdBy,
      updatedBy: undefined,
    };
    const categoryId = mockCategoryEntity.id;

    jest
      .spyOn(getCategoryByIdUseCase, 'execute')
      .mockResolvedValue({ category: mockCategoryEntity });

    const result = await getCategoryByIdController.handle(categoryId);

    expect(result).toEqual(mockMappedCategory);
    expect(getCategoryByIdUseCase.execute).toHaveBeenCalledWith({
      categoryId,
    });
  });
});
