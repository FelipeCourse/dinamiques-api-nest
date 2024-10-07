import { Test, TestingModule } from '@nestjs/testing';

import { EnvironmentsModule } from '@/shared/infrastructure/environments/environments.module';
import { EnvironmentsService } from '@/shared/infrastructure/environments/services/environments.service';
import { MessageService } from '@/shared/infrastructure/services';

import { UpdateArticleDto } from '@/features/articles/application/dtos';
import { UpdateArticleUseCase } from '@/features/articles/application/usecases';
import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';
import {
  EmailValueObject,
  PasswordValueObject,
  UsernameValueObject,
} from '@/features/auth/domain/value-objects';
import { UsersInMemoryRepository } from '@/features/auth/infrastructure/database/in-memory/repositories/users-in-memory.repository';
import { AuthService } from '@/features/auth/infrastructure/http/services';

import { UpdateArticleController } from './update-article.controller';

describe('UpdateArticleController unit tests', () => {
  let updateArticleUseCase: UpdateArticleUseCase;
  let messageService: MessageService;
  let updateArticleController: UpdateArticleController;

  const mockMessageService = {
    handleMessage: jest.fn().mockReturnValue({
      message: 'Artigo editado com sucesso.',
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
      controllers: [UpdateArticleController],
      providers: [
        {
          provide: UpdateArticleUseCase,
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

    updateArticleController = module.get<UpdateArticleController>(
      UpdateArticleController,
    );
    updateArticleUseCase =
      module.get<UpdateArticleUseCase>(UpdateArticleUseCase);
    messageService = module.get<MessageService>(MessageService);
  });

  it('should be able to define UpdateArticleController', () => {
    expect(updateArticleController).toBeDefined();
  });

  it('should be able to update an article', async () => {
    const articleId = '484ea5d0-dc65-4602-a8f0-e585eda81594';
    const updateArticleDto: UpdateArticleDto = {
      title: 'Updated Article',
    };
    const userEntity = UserEntity.create({
      email: EmailValueObject.create('teste@sd.com'),
      username: UsernameValueObject.create('test_user'),
      password: PasswordValueObject.create('test1234'),
      createdBy: '415ae5c0-dc65-4602-a8e1-e485eda20521',
    });
    const expectedMessage = 'Artigo editado com sucesso.';

    jest.spyOn(updateArticleUseCase, 'execute').mockResolvedValue(undefined);
    jest.spyOn(messageService, 'handleMessage').mockReturnValue({
      message: expectedMessage,
    });

    const result = await updateArticleController.handle(
      articleId,
      updateArticleDto,
      userEntity,
    );

    expect(result).toEqual({ message: expectedMessage });
    expect(updateArticleUseCase.execute).toHaveBeenCalledWith({
      articleId,
      title: updateArticleDto.title,
      updatedBy: userEntity.id,
    });
  });
});
