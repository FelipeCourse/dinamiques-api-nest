import { Test, TestingModule } from '@nestjs/testing';

import { PaginationDto } from '@/shared/application/dtos';
import { EnvironmentsModule } from '@/shared/infrastructure/environments/environments.module';
import { EnvironmentsService } from '@/shared/infrastructure/environments/services/environments.service';

import { GetAllUsersUseCase } from '@/features/auth/application/usecases';
import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';
import {
  EmailValueObject,
  PasswordValueObject,
  UsernameValueObject,
} from '@/features/auth/domain/value-objects';
import { UsersInMemoryRepository } from '@/features/auth/infrastructure/database/in-memory/repositories/users-in-memory.repository';

import { UserHttpMapper } from '../../mappers/user-http.mapper';
import { AuthService } from '../../services';
import { GetAllUsersController } from './get-all-users.controller';

describe('GetAllUsersController unit tests', () => {
  let getAllUsersController: GetAllUsersController;
  let getAllUsersUseCase: GetAllUsersUseCase;
  let userHttpMapper: typeof UserHttpMapper;

  const mockAuthService = {};

  const mockEnvironmentsService = {
    getDatabaseInMemory: jest.fn().mockReturnValue(true),
    getJwtSecret: jest.fn(),
    getJwtExpiresInSeconds: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvironmentsModule],
      controllers: [GetAllUsersController],
      providers: [
        {
          provide: GetAllUsersUseCase,
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

    getAllUsersController = module.get<GetAllUsersController>(
      GetAllUsersController,
    );
    getAllUsersUseCase = module.get<GetAllUsersUseCase>(GetAllUsersUseCase);
    userHttpMapper = module.get<typeof UserHttpMapper>(UserHttpMapper);
  });

  it('should be able to define GetAllUsersController', () => {
    expect(getAllUsersController).toBeDefined();
  });

  it('should be able to call GetAllUsersUseCase and return mapped users', async () => {
    const paginationDto: PaginationDto = {
      page: 1,
      limit: 10,
    };

    const mockUsers = [
      UserEntity.create({
        email: EmailValueObject.create('albert@test.com'),
        username: UsernameValueObject.create('alber9_cp'),
        password: PasswordValueObject.create('da@asd_.sd@1s'),
        createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
      }),
      UserEntity.create({
        email: EmailValueObject.create('ginna@test.com'),
        username: UsernameValueObject.create('gnn97'),
        password: PasswordValueObject.create('_ds@sd#.s'),
        createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
      }),
    ];

    const mockMappedUsers = mockUsers.map((user) => ({
      id: user.id,
      email: user.email.value,
      username: user.username.value,
      isActive: user.isActive,
      createdAt: expect.any(Date),
      updatedAt: undefined,
      createdBy: user.createdBy,
      updatedBy: undefined,
    }));

    jest
      .spyOn(getAllUsersUseCase, 'execute')
      .mockResolvedValue({ users: mockUsers });

    jest.spyOn(userHttpMapper, 'toHttp').mockImplementation((user) => ({
      id: user.id,
      email: user.email.value,
      username: user.username.value,
      password: user.password.value,
      isActive: user.isActive,
      createdAt: user.createdAt ?? expect.any(Date),
      updatedAt: user.updatedAt ?? undefined,
      createdBy: user.createdBy,
      updatedBy: user.updatedBy ?? undefined,
    }));

    const result = await getAllUsersController.handle(paginationDto);

    expect(result).toEqual(mockMappedUsers);
    expect(getAllUsersUseCase.execute).toHaveBeenCalledWith(paginationDto);
  });
});
