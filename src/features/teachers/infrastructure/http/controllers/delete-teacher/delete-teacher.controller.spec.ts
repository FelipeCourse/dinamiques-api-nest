import { Test, TestingModule } from '@nestjs/testing';

import { EnvironmentsModule } from '@/shared/infrastructure/environments/environments.module';
import { EnvironmentsService } from '@/shared/infrastructure/environments/services/environments.service';
import { MessageService } from '@/shared/infrastructure/services';

import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';
import { UsersInMemoryRepository } from '@/features/auth/infrastructure/database/in-memory/repositories/users-in-memory.repository';
import { AuthService } from '@/features/auth/infrastructure/http/services';
import { DeleteTeacherUseCase } from '@/features/teachers/application/usecases';

import { DeleteTeacherController } from './delete-teacher.controller';

describe('DeleteTeacherController unit tests', () => {
  let deleteTeacherUseCase: DeleteTeacherUseCase;
  let messageService: MessageService;
  let deleteTeacherController: DeleteTeacherController;

  const mockMessageService = {
    handleMessage: jest.fn().mockReturnValue({
      message: 'Docente removido com sucesso.',
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
      controllers: [DeleteTeacherController],
      providers: [
        {
          provide: DeleteTeacherUseCase,
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

    deleteTeacherController = module.get<DeleteTeacherController>(
      DeleteTeacherController,
    );
    deleteTeacherUseCase =
      module.get<DeleteTeacherUseCase>(DeleteTeacherUseCase);
    messageService = module.get<MessageService>(MessageService);
  });

  it('should be able to define DeleteTeacherController', () => {
    expect(DeleteTeacherController).toBeDefined();
  });

  it('should be able to delete (soft delete) a teacher', async () => {
    const teacherId = '484ea5d0-dc65-4602-a8f0-e585eda81594';
    const expectedMessage = 'Docente removido com sucesso.';

    jest.spyOn(deleteTeacherUseCase, 'execute').mockResolvedValue(undefined);
    jest.spyOn(messageService, 'handleMessage').mockReturnValue({
      message: expectedMessage,
    });

    const result = await deleteTeacherController.handle(teacherId);

    expect(result).toEqual({ message: expectedMessage });
    expect(deleteTeacherUseCase.execute).toHaveBeenCalledWith({
      teacherId,
      isSoftDelete: true,
    });
  });
});
