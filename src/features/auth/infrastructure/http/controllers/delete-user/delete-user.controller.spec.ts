import { Test, TestingModule } from '@nestjs/testing';

import { EnvironmentsModule } from '@/shared/infrastructure/environments/environments.module';
import { EnvironmentsService } from '@/shared/infrastructure/environments/services/environments.service';
import { MessageService } from '@/shared/infrastructure/services';

import { DeleteUserUseCase } from '@/features/auth/application/usecases';
import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';
import { UsersInMemoryRepository } from '@/features/auth/infrastructure/database/in-memory/repositories/users-in-memory.repository';

import { AuthService } from '../../services';
import { DeleteUserController } from './delete-user.controller';

describe('DeleteUserController unit tests', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let messageService: MessageService;
  let deleteUserController: DeleteUserController;

  const mockMessageService = {
    handleMessage: jest.fn().mockReturnValue({
      message: 'Usuário removido com sucesso.',
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
      controllers: [DeleteUserController],
      providers: [
        {
          provide: DeleteUserUseCase,
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

    deleteUserController =
      module.get<DeleteUserController>(DeleteUserController);
    deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
    messageService = module.get<MessageService>(MessageService);
  });

  it('should be able to define DeleteUserController', () => {
    expect(DeleteUserController).toBeDefined();
  });

  it('should be able to delete (soft delete) an user', async () => {
    const userId = '484ea5d0-dc65-4602-a8f0-e585eda81594';
    const expectedMessage = 'Usuário removido com sucesso.';

    jest.spyOn(deleteUserUseCase, 'execute').mockResolvedValue(undefined);
    jest.spyOn(messageService, 'handleMessage').mockReturnValue({
      message: expectedMessage,
    });

    const result = await deleteUserController.handle(userId);

    expect(result).toEqual({ message: expectedMessage });
    expect(deleteUserUseCase.execute).toHaveBeenCalledWith({
      userId,
      isSoftDelete: true,
    });
  });
});
