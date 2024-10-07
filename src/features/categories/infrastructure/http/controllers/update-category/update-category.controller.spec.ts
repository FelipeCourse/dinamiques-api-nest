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
import { UpdateCategoryDto } from '@/features/categories/application/dtos';
import { UpdateCategoryUseCase } from '@/features/categories/application/usecases';

import { UpdateCategoryController } from './update-category.controller';

describe('UpdateCategoryController unit tests', () => {
  let updateCategoryUseCase: UpdateCategoryUseCase;
  let messageService: MessageService;
  let updateCategoryController: UpdateCategoryController;

  const mockMessageService = {
    handleMessage: jest.fn().mockReturnValue({
      message: 'Categoria editada com sucesso.',
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
      controllers: [UpdateCategoryController],
      providers: [
        {
          provide: UpdateCategoryUseCase,
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

    updateCategoryController = module.get<UpdateCategoryController>(
      UpdateCategoryController,
    );
    updateCategoryUseCase = module.get<UpdateCategoryUseCase>(
      UpdateCategoryUseCase,
    );
    messageService = module.get<MessageService>(MessageService);
  });

  it('should be able to define UpdateCategoryController', () => {
    expect(updateCategoryController).toBeDefined();
  });

  it('should be able to update a category', async () => {
    const categoryId = '484ea5d0-dc65-4602-a8f0-e585eda81594';
    const updateCategoryDto: UpdateCategoryDto = {
      name: 'Updated Category',
      color: '#000000',
    };
    const userEntity = UserEntity.create({
      email: EmailValueObject.create('teste@sd.com'),
      username: UsernameValueObject.create('test_user'),
      password: PasswordValueObject.create('test1234'),
      createdBy: '415ae5c0-dc65-4602-a8e1-e485eda20521',
    });
    const expectedMessage = 'Categoria editada com sucesso.';

    jest.spyOn(updateCategoryUseCase, 'execute').mockResolvedValue(undefined);
    jest.spyOn(messageService, 'handleMessage').mockReturnValue({
      message: expectedMessage,
    });

    const result = await updateCategoryController.handle(
      categoryId,
      updateCategoryDto,
      userEntity,
    );

    expect(result).toEqual({ message: expectedMessage });
    expect(updateCategoryUseCase.execute).toHaveBeenCalledWith({
      categoryId,
      name: updateCategoryDto.name,
      color: updateCategoryDto.color,
      updatedBy: userEntity.id,
    });
  });
});
