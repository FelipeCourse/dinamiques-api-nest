import { Test, TestingModule } from '@nestjs/testing';

import { ImageUrlValueObject } from '@/shared/domain/value-objects';
import { EnvironmentsModule } from '@/shared/infrastructure/environments/environments.module';
import { EnvironmentsService } from '@/shared/infrastructure/environments/services/environments.service';
import { MessageService } from '@/shared/infrastructure/services';

import { CreateArticleDto } from '@/features/articles/application/dtos';
import { CreateArticleUseCase } from '@/features/articles/application/usecases';
import { ArticleEntity } from '@/features/articles/domain/entities/article.entity';
import {
  ContentValueObject,
  ReadingTimeValueObject,
  SummaryValueObject,
  TitleValueObject,
} from '@/features/articles/domain/value-objects';
import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';
import {
  EmailValueObject,
  PasswordValueObject,
  UsernameValueObject,
} from '@/features/auth/domain/value-objects';
import { UsersInMemoryRepository } from '@/features/auth/infrastructure/database/in-memory/repositories/users-in-memory.repository';
import { AuthService } from '@/features/auth/infrastructure/http/services';

import { CreateArticleController } from './create-article.controller';

describe('CreateArticleController unit tests', () => {
  let createArticleUseCase: CreateArticleUseCase;
  let messageService: MessageService;
  let createArticleController: CreateArticleController;

  const mockMessageService = {
    handleMessage: jest.fn().mockReturnValue({
      message: 'Artigo criado com sucesso.',
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
      controllers: [CreateArticleController],
      providers: [
        {
          provide: CreateArticleUseCase,
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

    createArticleController = module.get<CreateArticleController>(
      CreateArticleController,
    );
    createArticleUseCase =
      module.get<CreateArticleUseCase>(CreateArticleUseCase);
    messageService = module.get<MessageService>(MessageService);
  });

  it('should be able to define CreateArticleController', () => {
    expect(createArticleController).toBeDefined();
  });

  it('should be able to create an article', async () => {
    const createArticleDto: CreateArticleDto = {
      teacherId: '684ec5d0-dc65-5602-a8e1-e485eda81521',
      categoryId: '124ec5d0-dc65-5602-a8e1-e485eda81580',
      title: TitleValueObject.create('Teste de Artigo').value,
      summary: SummaryValueObject.create('Resumo do artigo de teste.').value,
      readingTime: ReadingTimeValueObject.create(35).value,
      content: ContentValueObject.create('<p>Teste</p>').value,
      highlightImageUrl: ImageUrlValueObject.create('https://pexels.com/test')
        .value,
    };

    const userEntity = UserEntity.create({
      email: EmailValueObject.create('teste@sd.com'),
      username: UsernameValueObject.create('test_user'),
      password: PasswordValueObject.create('test1234'),
      createdBy: '415ae5c0-dc65-4602-a8e1-e485eda20521',
    });

    const expectedArticle: Partial<ArticleEntity> = {
      teacherId: '684ec5d0-dc65-5602-a8e1-e485eda81521',
      categoryId: createArticleDto.categoryId,
      title: TitleValueObject.create(createArticleDto.title),
      summary: SummaryValueObject.create(createArticleDto.summary),
      readingTime: ReadingTimeValueObject.create(createArticleDto.readingTime),
      content: ContentValueObject.create(createArticleDto.content),
      highlightImageUrl: ImageUrlValueObject.create(
        createArticleDto.highlightImageUrl,
      ),
    };

    const expectedMessage = 'Artigo criado com sucesso.';

    jest
      .spyOn(createArticleUseCase, 'execute')
      .mockResolvedValue(expectedArticle);
    jest.spyOn(messageService, 'handleMessage').mockReturnValue({
      message: expectedMessage,
    });

    const result = await createArticleController.handle(
      createArticleDto,
      userEntity,
    );

    expect(result).toEqual({
      message: expectedMessage,
      data: expectedArticle,
    });
    expect(createArticleUseCase.execute).toHaveBeenCalledWith({
      teacherId: createArticleDto.teacherId,
      categoryId: createArticleDto.categoryId,
      title: createArticleDto.title,
      summary: createArticleDto.summary,
      readingTime: createArticleDto.readingTime,
      content: createArticleDto.content,
      highlightImageUrl: createArticleDto.highlightImageUrl,
      createdBy: userEntity.id,
    });
  });
});
