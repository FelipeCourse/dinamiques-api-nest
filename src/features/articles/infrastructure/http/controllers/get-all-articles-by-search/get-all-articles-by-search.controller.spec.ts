import { Test, TestingModule } from '@nestjs/testing';

import { QueryOptionsDto } from '@/shared/application/dtos';
import { ImageUrlValueObject } from '@/shared/domain/value-objects';

import { GetAllArticlesBySearchUseCase } from '@/features/articles/application/usecases';
import { ArticleEntity } from '@/features/articles/domain/entities/article.entity';
import {
  ContentValueObject,
  ReadingTimeValueObject,
  SummaryValueObject,
  TitleValueObject,
} from '@/features/articles/domain/value-objects';

import { ArticleHttpMapper } from '../../mappers/article-http.mapper';
import { GetAllArticlesBySearchController } from './get-all-articles-by-search.controller';

describe('GetAllArticlesBySearchController unit tests', () => {
  let getAllArticlesBySearchController: GetAllArticlesBySearchController;
  let getAllArticlesBySearchUseCase: GetAllArticlesBySearchUseCase;
  let articlesMapper: typeof ArticleHttpMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAllArticlesBySearchController],
      providers: [
        {
          provide: GetAllArticlesBySearchUseCase,
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

    getAllArticlesBySearchController =
      module.get<GetAllArticlesBySearchController>(
        GetAllArticlesBySearchController,
      );
    getAllArticlesBySearchUseCase = module.get<GetAllArticlesBySearchUseCase>(
      GetAllArticlesBySearchUseCase,
    );
    articlesMapper = module.get<typeof ArticleHttpMapper>(ArticleHttpMapper);
  });

  it('should be able to define GetAllArticlesBySearchController', () => {
    expect(getAllArticlesBySearchController).toBeDefined();
  });

  it('should be able to call GetAllArticlesBySearchUseCase and return mapped articles', async () => {
    const queryOptionsDto: QueryOptionsDto = {
      query: 'báskara',
      page: 1,
      limit: 10,
    };

    const mockArticles = [
      ArticleEntity.create({
        teacherId: '154ea5d0-dc65-4602-a8d0-e585eda81511',
        categoryId: '216ec5d0-dc65-4602-a8d2-e585eda61510',
        title: TitleValueObject.create('Artigo da fóruma de báskara'),
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
      .spyOn(getAllArticlesBySearchUseCase, 'execute')
      .mockResolvedValue({ articles: mockArticles });

    jest.spyOn(articlesMapper, 'toHttp').mockImplementation((article) => ({
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
      createdBy: article.createdBy ?? undefined,
      updatedBy: article.updatedBy ?? undefined,
    }));

    const result =
      await getAllArticlesBySearchController.handle(queryOptionsDto);

    expect(result).toEqual(mockMappedArticles);
    expect(getAllArticlesBySearchUseCase.execute).toHaveBeenCalledWith(
      queryOptionsDto,
    );
  });
});
