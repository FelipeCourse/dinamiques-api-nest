import { Test, TestingModule } from '@nestjs/testing';

import { EnvironmentsModule } from '@/shared/infrastructure/environments/environments.module';
import { EnvironmentsService } from '@/shared/infrastructure/environments/services/environments.service';
import { MessageService } from '@/shared/infrastructure/services';

import { UpdateUserDto } from '@/features/auth/application/dtos';
import { UpdateUserUseCase } from '@/features/auth/application/usecases';
import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';
import {
  EmailValueObject,
  PasswordValueObject,
  UsernameValueObject,
} from '@/features/auth/domain/value-objects';
import { UsersInMemoryRepository } from '@/features/auth/infrastructure/database/in-memory/repositories/users-in-memory.repository';

import { AuthService } from '../../services';
import { UpdateUserController } from './update-user.controller';

describe('UpdateUserController unit tests', () => {
  let updateUserUseCase: UpdateUserUseCase;
  let messageService: MessageService;
  let updateUserController: UpdateUserController;

  const mockMessageService = {
    handleMessage: jest.fn().mockReturnValue({
      message: 'Usuário editado com sucesso.',
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
      controllers: [UpdateUserController],
      providers: [
        {
          provide: UpdateUserUseCase,
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

    updateUserController =
      module.get<UpdateUserController>(UpdateUserController);
    updateUserUseCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
    messageService = module.get<MessageService>(MessageService);
  });

  it('should be able to define UpdateUserController', () => {
    expect(updateUserController).toBeDefined();
  });

  it('should be able to update a user', async () => {
    const userId = '484ea5d0-dc65-4602-a8f0-e585eda81594';
    const updateUserDto: UpdateUserDto = {
      email: 'albert@test.com',
      username: 'alber9_cp',
      password: 'asd_.sd@1s',
    };
    const userEntity = UserEntity.create({
      email: EmailValueObject.create('teste@sd.com'),
      username: UsernameValueObject.create('test_user'),
      password: PasswordValueObject.create('test1234'),
      createdBy: '415ae5c0-dc65-4602-a8e1-e485eda20521',
    });
    const expectedMessage = 'Usuário editado com sucesso.';

    jest.spyOn(updateUserUseCase, 'execute').mockResolvedValue(undefined);
    jest.spyOn(messageService, 'handleMessage').mockReturnValue({
      message: expectedMessage,
    });

    const result = await updateUserController.handle(
      userId,
      updateUserDto,
      userEntity,
    );

    expect(result).toEqual({ message: expectedMessage });
    expect(updateUserUseCase.execute).toHaveBeenCalledWith({
      userId,
      email: updateUserDto.email,
      username: updateUserDto.username,
      password: updateUserDto.password,
      updatedBy: userEntity.id,
    });
  });
});
