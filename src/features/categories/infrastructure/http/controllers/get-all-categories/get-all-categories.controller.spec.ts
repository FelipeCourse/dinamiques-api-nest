import { Test, TestingModule } from '@nestjs/testing';

import { PaginationDto } from '@/shared/application/dtos';

import { GetAllCategoriesUseCase } from '@/features/categories/application/usecases';
import { CategoryEntity } from '@/features/categories/domain/entities/category.entity';
import {
  ColorValueObject,
  NameValueObject,
} from '@/features/categories/domain/value-objects';

import { CategoryHttpMapper } from '../../mappers/category-http.mapper';
import { GetAllCategoriesController } from './get-all-categories.controller';

describe('GetAllCategoriesController unit tests', () => {
  let getAllCategoriesController: GetAllCategoriesController;
  let getAllCategoriesUseCase: GetAllCategoriesUseCase;
  let categoryHttpMapper: typeof CategoryHttpMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAllCategoriesController],
      providers: [
        {
          provide: GetAllCategoriesUseCase,
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

    getAllCategoriesController = module.get<GetAllCategoriesController>(
      GetAllCategoriesController,
    );
    getAllCategoriesUseCase = module.get<GetAllCategoriesUseCase>(
      GetAllCategoriesUseCase,
    );
    categoryHttpMapper =
      module.get<typeof CategoryHttpMapper>(CategoryHttpMapper);
  });

  it('should be able to define GetAllCategoriesController', () => {
    expect(getAllCategoriesController).toBeDefined();
  });

  it('should be able to call GetAllCategoriesUseCase and return mapped categories', async () => {
    const paginationDto: PaginationDto = {
      page: 1,
      limit: 10,
    };

    const mockCategories = [
      CategoryEntity.create({
        name: NameValueObject.create('Category 1'),
        color: ColorValueObject.create('#ffffff'),
        createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
      }),
      CategoryEntity.create({
        name: NameValueObject.create('Category 2'),
        color: ColorValueObject.create('#000000'),
        createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
      }),
    ];

    const mockMappedCategories = mockCategories.map((category) => ({
      id: category.id,
      name: category.name.value,
      color: category.color.value,
      isActive: category.isActive,
      createdAt: expect.any(Date),
      updatedAt: undefined,
      createdBy: category.createdBy,
      updatedBy: undefined,
    }));

    jest
      .spyOn(getAllCategoriesUseCase, 'execute')
      .mockResolvedValue({ categories: mockCategories });

    jest.spyOn(categoryHttpMapper, 'toHttp').mockImplementation((category) => ({
      id: category.id,
      name: category.name.value,
      color: category.color.value,
      isActive: category.isActive,
      createdAt: category.createdAt ?? expect.any(Date),
      updatedAt: category.updatedAt ?? undefined,
      createdBy: category.createdBy,
      updatedBy: category.updatedBy ?? undefined,
    }));

    const result = await getAllCategoriesController.handle(paginationDto);

    expect(result).toEqual(mockMappedCategories);
    expect(getAllCategoriesUseCase.execute).toHaveBeenCalledWith(paginationDto);
  });
});
