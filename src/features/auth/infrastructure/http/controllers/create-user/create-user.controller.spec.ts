import { Test, TestingModule } from '@nestjs/testing';

import { EnvironmentsModule } from '@/shared/infrastructure/environments/environments.module';
import { EnvironmentsService } from '@/shared/infrastructure/environments/services/environments.service';
import { MessageService } from '@/shared/infrastructure/services';

import { CreateUserDto } from '@/features/auth/application/dtos';
import { CreateUserUseCase } from '@/features/auth/application/usecases';
import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';
import {
  EmailValueObject,
  PasswordValueObject,
  UsernameValueObject,
} from '@/features/auth/domain/value-objects';
import { UsersInMemoryRepository } from '@/features/auth/infrastructure/database/in-memory/repositories/users-in-memory.repository';

import { AuthService } from '../../services';
import { CreateUserController } from './create-user.controller';

describe('CreateUserController unit tests', () => {
  let createUserUseCase: CreateUserUseCase;
  let messageService: MessageService;
  let createUserController: CreateUserController;

  const mockMessageService = {
    handleMessage: jest.fn().mockReturnValue({
      message: 'Usuário criado com sucesso.',
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
      controllers: [CreateUserController],
      providers: [
        {
          provide: CreateUserUseCase,
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

    createUserController =
      module.get<CreateUserController>(CreateUserController);
    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    messageService = module.get<MessageService>(MessageService);
  });

  it('should be able to define CreateUserController', () => {
    expect(createUserController).toBeDefined();
  });

  it('should be able to create a user', async () => {
    const createUserDto: CreateUserDto = {
      email: EmailValueObject.create('albert@test.com').value,
      username: UsernameValueObject.create('alber9_cp').value,
      password: PasswordValueObject.create('da@asd_.sd@1s').value,
    };
    const userEntity = UserEntity.create({
      email: EmailValueObject.create('teste@sd.com'),
      username: UsernameValueObject.create('test_user'),
      password: PasswordValueObject.create('test1234'),
      createdBy: '415ae5c0-dc65-4602-a8e1-e485eda20521',
    });
    const expectedUser: Partial<UserEntity> = {
      email: EmailValueObject.create(createUserDto.email),
      username: UsernameValueObject.create(createUserDto.username),
      password: PasswordValueObject.create(createUserDto.password),
    };
    const expectedMessage = 'Usuário criado com sucesso.';

    jest.spyOn(createUserUseCase, 'execute').mockResolvedValue(expectedUser);
    jest.spyOn(messageService, 'handleMessage').mockReturnValue({
      message: expectedMessage,
    });

    const result = await createUserController.handle(createUserDto, userEntity);

    expect(result).toEqual({
      message: expectedMessage,
      data: expectedUser,
    });
    expect(createUserUseCase.execute).toHaveBeenCalledWith({
      email: createUserDto.email,
      username: createUserDto.username,
      password: createUserDto.password,
      createdBy: userEntity.id,
    });
  });
});
