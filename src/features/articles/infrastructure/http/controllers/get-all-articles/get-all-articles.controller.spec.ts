import { Test, TestingModule } from '@nestjs/testing';

import { PaginationDto } from '@/shared/application/dtos';
import { ImageUrlValueObject } from '@/shared/domain/value-objects';

import { GetAllArticlesUseCase } from '@/features/articles/application/usecases';
import { ArticleEntity } from '@/features/articles/domain/entities/article.entity';
import {
  ContentValueObject,
  ReadingTimeValueObject,
  SummaryValueObject,
  TitleValueObject,
} from '@/features/articles/domain/value-objects';

import { ArticleHttpMapper } from '../../mappers/article-http.mapper';
import { GetAllArticlesController } from './get-all-articles.controller';

describe('GetAllArticlesController unit tests', () => {
  let getAllArticlesController: GetAllArticlesController;
  let getAllArticlesUseCase: GetAllArticlesUseCase;
  let articleHttpMapper: typeof ArticleHttpMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAllArticlesController],
      providers: [
        {
          provide: GetAllArticlesUseCase,
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

    getAllArticlesController = module.get<GetAllArticlesController>(
      GetAllArticlesController,
    );
    getAllArticlesUseCase = module.get<GetAllArticlesUseCase>(
      GetAllArticlesUseCase,
    );
    articleHttpMapper = module.get<typeof ArticleHttpMapper>(ArticleHttpMapper);
  });

  it('should be able to define GetAllArticlesController', () => {
    expect(getAllArticlesController).toBeDefined();
  });

  it('should be able to call GetAllArticlesUseCase and return mapped articles', async () => {
    const paginationDto: PaginationDto = {
      page: 1,
      limit: 10,
    };

    const mockArticles = [
      ArticleEntity.create({
        teacherId: '154ea5d0-dc65-4602-a8d0-e585eda81511',
        categoryId: '216ec5d0-dc65-4602-a8d2-e585eda61510',
        title: TitleValueObject.create('Artigo 1'),
        summary: SummaryValueObject.create('Resumo do Artigo 1'),
        readingTime: ReadingTimeValueObject.create(12),
        content: ContentValueObject.create('<h1>Conteúdo</h1>'),
        highlightImageUrl: ImageUrlValueObject.create(
          'https://pexels.com/test',
        ),
        createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
      }),
      ArticleEntity.create({
        teacherId: '148ca5d0-dc65-4602-a8d0-e585eda81511',
        categoryId: '326ec5d0-dc65-4601-a8d2-e585eda61211',
        title: TitleValueObject.create('Artigo 2'),
        summary: SummaryValueObject.create('Resumo do Artigo 2'),
        readingTime: ReadingTimeValueObject.create(20),
        content: ContentValueObject.create('<h1>Conteúdo</h1>'),
        highlightImageUrl: ImageUrlValueObject.create(
          'https://pexels.com/test',
        ),
        createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
      }),
    ];

    const mockMappedArticles = mockArticles.map((article) => ({
      id: article.id,
      teacherId: article.teacherId,
      categoryId: article.categoryId,
      title: article.title.value,
      slug: article.slug.value,
      summary: article.summary.value,
      readingTime: article.readingTime.value,
      content: article.content.value,
      highlightImageUrl: article.highlightImageUrl.value,
      publishedLastDate: article.publishedLastDate,
      isPublished: article.isPublished,
      createdAt: expect.any(Date),
      updatedAt: undefined,
      createdBy: article.createdBy,
      updatedBy: undefined,
    }));

    jest
      .spyOn(getAllArticlesUseCase, 'execute')
      .mockResolvedValue({ articles: mockArticles });

    jest.spyOn(articleHttpMapper, 'toHttp').mockImplementation((article) => ({
      id: article.id,
      teacherId: article.teacherId,
      categoryId: article.categoryId,
      title: article.title.value,
      slug: article.slug.value,
      summary: article.summary.value,
      readingTime: article.readingTime.value,
      content: article.content.value,
      highlightImageUrl: article.highlightImageUrl.value,
      publishedLastDate: article.publishedLastDate,
      isPublished: article.isPublished,
      createdAt: article.createdAt ?? expect.any(Date),
      updatedAt: article.updatedAt ?? undefined,
      createdBy: article.createdBy,
      updatedBy: article.updatedBy ?? undefined,
    }));

    const result = await getAllArticlesController.handle(paginationDto);

    expect(result).toEqual(mockMappedArticles);
    expect(getAllArticlesUseCase.execute).toHaveBeenCalledWith(paginationDto);
  });
});
