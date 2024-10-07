import { Test, TestingModule } from '@nestjs/testing';

import { EnvironmentsModule } from '@/shared/infrastructure/environments/environments.module';
import { EnvironmentsService } from '@/shared/infrastructure/environments/services/environments.service';
import { MessageService } from '@/shared/infrastructure/services';

import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';
import {
  EmailValueObject,
  PasswordValueObject,
  UsernameValueObject,
} from '@/features/auth/domain/value-objects';
import { UsersInMemoryRepository } from '@/features/auth/infrastructure/database/in-memory/repositories/users-in-memory.repository';
import { AuthService } from '@/features/auth/infrastructure/http/services';
import { UpdateTeacherDto } from '@/features/teachers/application/dtos';
import { UpdateTeacherUseCase } from '@/features/teachers/application/usecases';

import { UpdateTeacherController } from './update-teacher.controller';

describe('UpdateTeacherController unit tests', () => {
  let updateTeacherUseCase: UpdateTeacherUseCase;
  let messageService: MessageService;
  let updateTeacherController: UpdateTeacherController;

  const mockMessageService = {
    handleMessage: jest.fn().mockReturnValue({
      message: 'Docente editado com sucesso.',
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
      controllers: [UpdateTeacherController],
      providers: [
        {
          provide: UpdateTeacherUseCase,
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

    updateTeacherController = module.get<UpdateTeacherController>(
      UpdateTeacherController,
    );
    updateTeacherUseCase =
      module.get<UpdateTeacherUseCase>(UpdateTeacherUseCase);
    messageService = module.get<MessageService>(MessageService);
  });

  it('should be able to define UpdateTeacherController', () => {
    expect(updateTeacherController).toBeDefined();
  });

  it('should be able to update a teacher', async () => {
    const teacherId = '484ea5d0-dc65-4602-a8f0-e585eda81594';
    const updateTeacherDto: UpdateTeacherDto = {
      name: 'Updated Teacher',
    };
    const userEntity = UserEntity.create({
      email: EmailValueObject.create('teste@sd.com'),
      username: UsernameValueObject.create('test_user'),
      password: PasswordValueObject.create('test1234'),
      createdBy: '415ae5c0-dc65-4602-a8e1-e485eda20521',
    });
    const expectedMessage = 'Docente editado com sucesso.';

    jest.spyOn(updateTeacherUseCase, 'execute').mockResolvedValue(undefined);
    jest.spyOn(messageService, 'handleMessage').mockReturnValue({
      message: expectedMessage,
    });

    const result = await updateTeacherController.handle(
      teacherId,
      updateTeacherDto,
      userEntity,
    );

    expect(result).toEqual({ message: expectedMessage });
    expect(updateTeacherUseCase.execute).toHaveBeenCalledWith({
      teacherId,
      name: updateTeacherDto.name,
      updatedBy: userEntity.id,
    });
  });
});
