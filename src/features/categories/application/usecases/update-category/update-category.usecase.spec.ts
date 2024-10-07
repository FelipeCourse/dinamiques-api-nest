import { NotFoundError } from '@/shared/domain/errors';
import { GenderEnum } from '@/shared/enums';

import {
  ColorValueObject,
  NameValueObject,
} from '@/features/categories/domain/value-objects';

import { UpdateCategoryUseCase } from './update-category.usecase';

const mockCategoriesRepository = {
  getById: jest.fn(),
  update: jest.fn(),
};

const mockMessageService = {
  handleMessage: jest.fn(),
};

describe('UpdateCategoryUseCase unit tests', () => {
  let updateCategoryUseCase: UpdateCategoryUseCase;

  beforeEach(() => {
    updateCategoryUseCase = new UpdateCategoryUseCase(
      mockCategoriesRepository as any,
      mockMessageService as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to update name field when name is provided', async () => {
    const currentCategory = {
      name: NameValueObject.create('Categoria Atual'),
      color: ColorValueObject.create('#111212'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    mockCategoriesRepository.getById.mockResolvedValue(currentCategory);
    mockCategoriesRepository.update.mockResolvedValue(undefined);

    const request = {
      categoryId: '129ec5c1-dc65-4602-f8e1-e485eda80525',
      name: 'Categoria Editado',
      updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    await updateCategoryUseCase.execute(request);

    expect(mockCategoriesRepository.getById).toHaveBeenCalledWith(
      request.categoryId,
    );
    expect(mockCategoriesRepository.update).toHaveBeenCalledWith(
      request.categoryId,
      expect.objectContaining({
        name: NameValueObject.create('Categoria Editado'),
      }),
    );
  });

  it('should be able to update color field when color is provided', async () => {
    const currentCategory = {
      name: NameValueObject.create('Categoria Atual'),
      color: ColorValueObject.create('#111212'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    mockCategoriesRepository.getById.mockResolvedValue(currentCategory);
    mockCategoriesRepository.update.mockResolvedValue(undefined);

    const request = {
      categoryId: '129ec5c1-dc65-4602-f8e1-e485eda80525',
      color: '#000',
      updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    await updateCategoryUseCase.execute(request);

    expect(mockCategoriesRepository.getById).toHaveBeenCalledWith(
      request.categoryId,
    );
    expect(mockCategoriesRepository.update).toHaveBeenCalledWith(
      request.categoryId,
      expect.objectContaining({
        color: ColorValueObject.create('#000'),
      }),
    );
  });

  it('should be able to update isActive field when isActive is provided', async () => {
    const currentCategory = {
      name: NameValueObject.create('Categoria Atual'),
      color: ColorValueObject.create('#111212'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    mockCategoriesRepository.getById.mockResolvedValue(currentCategory);
    mockCategoriesRepository.update.mockResolvedValue(undefined);

    const request = {
      categoryId: '129ec5c1-dc65-4602-f8e1-e485eda80525',
      isActive: false,
      updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    await updateCategoryUseCase.execute(request);

    expect(mockCategoriesRepository.getById).toHaveBeenCalledWith(
      request.categoryId,
    );
    expect(mockCategoriesRepository.update).toHaveBeenCalledWith(
      request.categoryId,
      expect.objectContaining({
        isActive: false,
      }),
    );
  });

  it('should be able to handle partial updates and not change unchanged fields', async () => {
    const currentCategory = {
      categoryId: '129ec5c1-dc65-4602-f8e1-e485eda80525',
      name: NameValueObject.create('Categoria Atual'),
      color: ColorValueObject.create('#111212'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    mockCategoriesRepository.getById.mockResolvedValue(currentCategory);
    mockCategoriesRepository.update.mockResolvedValue(undefined);

    const request = {
      categoryId: '129ec5c1-dc65-4602-f8e1-e485eda80525',
      updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    await updateCategoryUseCase.execute(request);

    expect(mockCategoriesRepository.getById).toHaveBeenCalledWith(
      request.categoryId,
    );
    expect(mockCategoriesRepository.update).toHaveBeenCalledWith(
      request.categoryId,
      expect.objectContaining({
        categoryId: '129ec5c1-dc65-4602-f8e1-e485eda80525',
        name: NameValueObject.create('Categoria Atual'),
      }),
    );
  });

  it('should not be able to update a non existing category', async () => {
    mockCategoriesRepository.getById.mockResolvedValue(null);
    mockMessageService.handleMessage.mockReturnValue({
      message: 'Categoria não encontrado.',
    });

    await expect(
      updateCategoryUseCase.execute({
        categoryId: 'fake-id',
        updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
      }),
    ).rejects.toThrow(NotFoundError);

    expect(mockMessageService.handleMessage).toHaveBeenCalledWith({
      messageType: 'error',
      resource: 'Categoria',
      action: 'notFound',
      gender: GenderEnum.FEMALE,
    });
  });
});
