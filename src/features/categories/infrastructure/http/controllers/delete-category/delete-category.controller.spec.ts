import { Test, TestingModule } from '@nestjs/testing';

import { EnvironmentsModule } from '@/shared/infrastructure/environments/environments.module';
import { EnvironmentsService } from '@/shared/infrastructure/environments/services/environments.service';
import { MessageService } from '@/shared/infrastructure/services';

import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';
import { UsersInMemoryRepository } from '@/features/auth/infrastructure/database/in-memory/repositories/users-in-memory.repository';
import { AuthService } from '@/features/auth/infrastructure/http/services';
import { DeleteCategoryUseCase } from '@/features/categories/application/usecases';

import { DeleteCategoryController } from './delete-category.controller';

describe('DeleteCategoryController unit tests', () => {
  let deleteCategoryUseCase: DeleteCategoryUseCase;
  let messageService: MessageService;
  let deleteCategoryController: DeleteCategoryController;

  const mockMessageService = {
    handleMessage: jest.fn().mockReturnValue({
      message: 'Categoria removida com sucesso.',
    }),
  };

  const mockAuthService = {};

  const mockEnvironmentsService = {
    getDatabaseInMemory: jest.fn().mockReturnValue(true),
    getJwtSecret: jest.fn(),
    getJwtExpiresInSeconds: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvironmentsModule],
      controllers: [DeleteCategoryController],
      providers: [
        {
          provide: DeleteCategoryUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: MessageService,
          useValue: mockMessageService,
        },
        {
          provide: EnvironmentsService,
          useValue: mockEnvironmentsService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: UsersRepository,
          useClass: UsersInMemoryRepository,
        },
      ],
    }).compile();

    deleteCategoryController = module.get<DeleteCategoryController>(
      DeleteCategoryController,
    );
    deleteCategoryUseCase = module.get<DeleteCategoryUseCase>(
      DeleteCategoryUseCase,
    );
    messageService = module.get<MessageService>(MessageService);
  });

  it('should be able to define DeleteCategoryController', () => {
    expect(deleteCategoryController).toBeDefined();
  });

  it('should be able to delete a category', async () => {
    const categoryId = '484ea5d0-dc65-4602-a8f0-e585eda81594';
    const expectedMessage = 'Categoria removida com sucesso.';

    jest.spyOn(deleteCategoryUseCase, 'execute').mockResolvedValue(undefined);
    jest.spyOn(messageService, 'handleMessage').mockReturnValue({
      message: expectedMessage,
    });

    const result = await deleteCategoryController.handle(categoryId);

    expect(result).toEqual({ message: expectedMessage });
    expect(deleteCategoryUseCase.execute).toHaveBeenCalledWith({ categoryId });
  });
});
