import { Test, TestingModule } from '@nestjs/testing';

import { ImageUrlValueObject } from '@/shared/domain/value-objects';

import { GetArticleByIdUseCase } from '@/features/articles/application/usecases';
import { ArticleEntity } from '@/features/articles/domain/entities/article.entity';
import {
  ContentValueObject,
  ReadingTimeValueObject,
  SummaryValueObject,
  TitleValueObject,
} from '@/features/articles/domain/value-objects';

import { ArticleHttpMapper } from '../../mappers/article-http.mapper';
import { GetArticleByIdController } from './get-article-by-id.controller';

describe('GetArticleByIdController unit tests', () => {
  let getArticleByIdController: GetArticleByIdController;
  let getArticleByIdUseCase: GetArticleByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetArticleByIdController],
      providers: [
        {
          provide: GetArticleByIdUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: ArticleHttpMapper,
          useValue: {
            toHttp: jest.fn(),
          },
        },
      ],
    }).compile();

    getArticleByIdController = module.get<GetArticleByIdController>(
      GetArticleByIdController,
    );
    getArticleByIdUseCase = module.get<GetArticleByIdUseCase>(
      GetArticleByIdUseCase,
    );
  });

  it('should be able to define GetArticleByIdUseCase', () => {
    expect(getArticleByIdController).toBeDefined();
  });

  it('should be able to call getArticleByIdUseCase and return the mapped article', async () => {
    const mockArticle = ArticleEntity.create({
      teacherId: '154ea5d0-dc65-4602-a8d0-e585eda81511',
      categoryId: '216ec5d0-dc65-4602-a8d2-e585eda61510',
      title: TitleValueObject.create('Artigo 1'),
      summary: SummaryValueObject.create('Resumo do Artigo 1'),
      readingTime: ReadingTimeValueObject.create(12),
      content: ContentValueObject.create('<h1>Conteúdo</h1>'),
      highlightImageUrl: ImageUrlValueObject.create('https://pexels.com/test'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });
    const mockMappedArticle = {
      id: mockArticle.id,
      teacherId: mockArticle.teacherId,
      categoryId: mockArticle.categoryId,
      title: mockArticle.title.value,
      slug: mockArticle.slug.value,
      summary: mockArticle.summary.value,
      readingTime: mockArticle.readingTime.value,
      content: mockArticle.content.value,
      highlightImageUrl: mockArticle.highlightImageUrl.value,
      publishedLastDate: mockArticle.publishedLastDate,
      isPublished: mockArticle.isPublished,
      createdAt: expect.any(Date),
      updatedAt: undefined,
      createdBy: mockArticle.createdBy,
      updatedBy: undefined,
    };
    const articleId = mockArticle.id;

    jest
      .spyOn(getArticleByIdUseCase, 'execute')
      .mockResolvedValue({ article: mockArticle });

    const result = await getArticleByIdController.handle(articleId);

    expect(result).toEqual(mockMappedArticle);
    expect(getArticleByIdUseCase.execute).toHaveBeenCalledWith({
      articleId,
    });
  });
});
