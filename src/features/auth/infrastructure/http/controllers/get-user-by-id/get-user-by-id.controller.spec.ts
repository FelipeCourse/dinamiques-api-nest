import { Test, TestingModule } from '@nestjs/testing';

import { EnvironmentsModule } from '@/shared/infrastructure/environments/environments.module';
import { EnvironmentsService } from '@/shared/infrastructure/environments/services/environments.service';

import { GetUserByIdUseCase } from '@/features/auth/application/usecases';
import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';
import {
  EmailValueObject,
  PasswordValueObject,
  UsernameValueObject,
} from '@/features/auth/domain/value-objects';
import { UsersInMemoryRepository } from '@/features/auth/infrastructure/database/in-memory/repositories/users-in-memory.repository';
import { UserHttpMapper } from '@/features/auth/infrastructure/http/mappers/user-http.mapper';

import { AuthService } from '../../services';
import { GetUserByIdController } from './get-user-by-id.controller';

describe('GetUserByIdController unit tests', () => {
  let getUserByIdController: GetUserByIdController;
  let getUserByIdUseCase: GetUserByIdUseCase;

  const mockAuthService = {};

  const mockEnvironmentsService = {
    getDatabaseInMemory: jest.fn().mockReturnValue(true),
    getJwtSecret: jest.fn(),
    getJwtExpiresInSeconds: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvironmentsModule],
      controllers: [GetUserByIdController],
      providers: [
        {
          provide: GetUserByIdUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UserHttpMapper,
          useValue: {
            toHttp: jest.fn(),
          },
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

    getUserByIdController = module.get<GetUserByIdController>(
      GetUserByIdController,
    );
    getUserByIdUseCase = module.get<GetUserByIdUseCase>(GetUserByIdUseCase);
  });

  it('should be able to define GetUserByIdUseCase', () => {
    expect(getUserByIdController).toBeDefined();
  });

  it('should be able to call getUserByIdUseCase and return the mapped user', async () => {
    const mockUserEntity = UserEntity.create({
      email: EmailValueObject.create('albert@test.com'),
      username: UsernameValueObject.create('alber9_cp'),
      password: PasswordValueObject.create('da@asd_.sd@1s'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });
    const mockMappedUser = {
      id: mockUserEntity.id,
      email: mockUserEntity.email.value,
      username: mockUserEntity.username.value,
      isActive: mockUserEntity.isActive,
      createdAt: expect.any(Date),
      updatedAt: undefined,
      createdBy: mockUserEntity.createdBy,
      updatedBy: undefined,
    };
    const userId = mockUserEntity.id;

    jest
      .spyOn(getUserByIdUseCase, 'execute')
      .mockResolvedValue({ user: mockUserEntity });

    const result = await getUserByIdController.handle(userId);

    expect(result).toEqual(mockMappedUser);
    expect(getUserByIdUseCase.execute).toHaveBeenCalledWith({
      userId,
    });
  });
});
