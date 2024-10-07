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
import { CreateCategoryDto } from '@/features/categories/application/dtos';
import { CreateCategoryUseCase } from '@/features/categories/application/usecases';
import { CategoryEntity } from '@/features/categories/domain/entities/category.entity';
import {
  ColorValueObject,
  NameValueObject,
} from '@/features/categories/domain/value-objects';

import { CreateCategoryController } from './create-category.controller';

describe('CreateCategoryController unit tests', () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let messageService: MessageService;
  let createCategoryController: CreateCategoryController;

  const mockMessageService = {
    handleMessage: jest.fn().mockReturnValue({
      message: 'Categoria criada com sucesso.',
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
      controllers: [CreateCategoryController],
      providers: [
        {
          provide: CreateCategoryUseCase,
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

    createCategoryController = module.get<CreateCategoryController>(
      CreateCategoryController,
    );
    createCategoryUseCase = module.get<CreateCategoryUseCase>(
      CreateCategoryUseCase,
    );
    messageService = module.get<MessageService>(MessageService);
  });

  it('should be able to define CreateCategoryController', () => {
    expect(createCategoryController).toBeDefined();
  });

  it('should be able to create a category', async () => {
    const createCategoryDto: CreateCategoryDto = {
      name: NameValueObject.create('Test Category').value,
      color: ColorValueObject.create('#ffffff').value,
    };
    const userEntity = UserEntity.create({
      email: EmailValueObject.create('teste@sd.com'),
      username: UsernameValueObject.create('test_user'),
      password: PasswordValueObject.create('test1234'),
      createdBy: '415ae5c0-dc65-4602-a8e1-e485eda20521',
    });
    const expectedCategory: Partial<CategoryEntity> = {
      name: NameValueObject.create(createCategoryDto.name),
      color: ColorValueObject.create(createCategoryDto.color),
    };
    const expectedMessage = 'Categoria criada com sucesso.';

    jest
      .spyOn(createCategoryUseCase, 'execute')
      .mockResolvedValue(expectedCategory);
    jest.spyOn(messageService, 'handleMessage').mockReturnValue({
      message: expectedMessage,
    });

    const result = await createCategoryController.handle(
      createCategoryDto,
      userEntity,
    );

    expect(result).toEqual({
      message: expectedMessage,
      data: expectedCategory,
    });
    expect(createCategoryUseCase.execute).toHaveBeenCalledWith({
      name: createCategoryDto.name,
      color: createCategoryDto.color,
      createdBy: userEntity.id,
    });
  });
});
