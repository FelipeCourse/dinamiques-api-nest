import { Test, TestingModule } from '@nestjs/testing';

import { EnvironmentsModule } from '@/shared/infrastructure/environments/environments.module';
import { EnvironmentsService } from '@/shared/infrastructure/environments/services/environments.service';
import { MessageService } from '@/shared/infrastructure/services';

import { DeleteArticleUseCase } from '@/features/articles/application/usecases';
import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';
import { UsersInMemoryRepository } from '@/features/auth/infrastructure/database/in-memory/repositories/users-in-memory.repository';
import { AuthService } from '@/features/auth/infrastructure/http/services';

import { DeleteArticleController } from './delete-article.controller';

describe('DeleteArticleController unit tests', () => {
  let deleteArticleUseCase: DeleteArticleUseCase;
  let messageService: MessageService;
  let deleteArticleController: DeleteArticleController;

  const mockMessageService = {
    handleMessage: jest.fn().mockReturnValue({
      message: 'Artigo removido com sucesso.',
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
      controllers: [DeleteArticleController],
      providers: [
        {
          provide: DeleteArticleUseCase,
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

    deleteArticleController = module.get<DeleteArticleController>(
      DeleteArticleController,
    );
    deleteArticleUseCase =
      module.get<DeleteArticleUseCase>(DeleteArticleUseCase);
    messageService = module.get<MessageService>(MessageService);
  });

  it('should be able to define DeleteArticleController', () => {
    expect(DeleteArticleController).toBeDefined();
  });

  it('should be able to delete an article', async () => {
    const articleId = '484ea5d0-dc65-4602-a8f0-e585eda81594';
    const expectedMessage = 'Artigo removido com sucesso.';

    jest.spyOn(deleteArticleUseCase, 'execute').mockResolvedValue(undefined);
    jest.spyOn(messageService, 'handleMessage').mockReturnValue({
      message: expectedMessage,
    });

    const result = await deleteArticleController.handle(articleId);

    expect(result).toEqual({ message: expectedMessage });
    expect(deleteArticleUseCase.execute).toHaveBeenCalledWith({
      articleId,
    });
  });
});
