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
import { CreateTeacherDto } from '@/features/teachers/application/dtos';
import { CreateTeacherUseCase } from '@/features/teachers/application/usecases';
import { TeacherEntity } from '@/features/teachers/domain/entities/teacher.entity';
import { NameValueObject } from '@/features/teachers/domain/value-objects';

import { CreateTeacherController } from './create-teacher.controller';

describe('CreateTeacherController unit tests', () => {
  let createTeacherUseCase: CreateTeacherUseCase;
  let messageService: MessageService;
  let createTeacherController: CreateTeacherController;

  const mockMessageService = {
    handleMessage: jest.fn().mockReturnValue({
      message: 'Docente criado com sucesso.',
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
      controllers: [CreateTeacherController],
      providers: [
        {
          provide: CreateTeacherUseCase,
          useValue: {
            execute: jest.fn(),
          },
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

    createTeacherController = module.get<CreateTeacherController>(
      CreateTeacherController,
    );
    createTeacherUseCase =
      module.get<CreateTeacherUseCase>(CreateTeacherUseCase);
    messageService = module.get<MessageService>(MessageService);
  });

  it('should be able to define CreateTeacherController', () => {
    expect(createTeacherController).toBeDefined();
  });

  it('should be able to create a teacher', async () => {
    const createTeacherDto: CreateTeacherDto = {
      userId: '415ae5c0-dc65-4602-a8e1-e485eda20521',
      name: NameValueObject.create('Test Teacher').value,
    };
    const userEntity = UserEntity.create({
      email: EmailValueObject.create('teste@sd.com'),
      username: UsernameValueObject.create('test_user'),
      password: PasswordValueObject.create('test1234'),
      createdBy: '415ae5c0-dc65-4602-a8e1-e485eda20521',
    });
    const expectedTeacher: Partial<TeacherEntity> = {
      name: NameValueObject.create(createTeacherDto.name),
    };
    const expectedMessage = 'Docente criado com sucesso.';

    jest
      .spyOn(createTeacherUseCase, 'execute')
      .mockResolvedValue(expectedTeacher);
    jest.spyOn(messageService, 'handleMessage').mockReturnValue({
      message: expectedMessage,
    });

    const result = await createTeacherController.handle(
      createTeacherDto,
      userEntity,
    );

    expect(result).toEqual({
      message: expectedMessage,
      data: expectedTeacher,
    });
    expect(createTeacherUseCase.execute).toHaveBeenCalledWith({
      userId: createTeacherDto.userId,
      name: createTeacherDto.name,
      createdBy: userEntity.id,
    });
  });
});
