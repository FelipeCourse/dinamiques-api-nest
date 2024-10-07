import { ImageUrlValueObject } from '@/shared/domain/value-objects';

import { ArticleEntity } from '@/features/articles/domain/entities/article.entity';
import {
  ContentValueObject,
  ReadingTimeValueObject,
  SummaryValueObject,
  TitleValueObject,
} from '@/features/articles/domain/value-objects';
import { ArticlesInMemoryRepository } from '@/features/articles/infrastructure/database/in-memory/repositories/articles-in-memory.repository';

import { GetAllArticlesBySearchUseCase } from './get-all-articles-by-search.usecase';

describe('GetAllArticlesBySearchUseCase unit tests', () => {
  let articlesRepository: ArticlesInMemoryRepository;
  let getAllArticlesBySearchUseCase: GetAllArticlesBySearchUseCase;

  beforeEach(() => {
    articlesRepository = new ArticlesInMemoryRepository();
    getAllArticlesBySearchUseCase = new GetAllArticlesBySearchUseCase(
      articlesRepository,
    );
  });

  it('should be able to get all articles with filters', async () => {
    const article1 = ArticleEntity.create({
      teacherId: '1',
      categoryId: '2',
      title: TitleValueObject.create('Teste Artigo 1'),
      summary: SummaryValueObject.create('Teste resumo'),
      readingTime: ReadingTimeValueObject.create(30),
      content: ContentValueObject.create('Conteúdo 1'),
      highlightImageUrl: ImageUrlValueObject.create('https://pexels.com/test'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });
    const article2 = ArticleEntity.create({
      teacherId: '1',
      categoryId: '2',
      title: TitleValueObject.create('Teste Artigo 2'),
      summary: SummaryValueObject.create('Teste resumo'),
      readingTime: ReadingTimeValueObject.create(30),
      content: ContentValueObject.create('Conteúdo 2'),
      highlightImageUrl: ImageUrlValueObject.create('https://pexels.com/test'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });

    articlesRepository.entities.push(article1, article2);

    const query = 'Teste';
    const page = 1;
    const limit = 10;
    const { articles } = await getAllArticlesBySearchUseCase.execute({
      query,
      page,
      limit,
    });

    expect(articles).toHaveLength(2);
    expect(articles).toEqual(expect.arrayContaining([article1, article2]));
  });

  it('should be able to get all articles without filters', async () => {
    const article1 = ArticleEntity.create({
      teacherId: '1',
      categoryId: '2',
      title: TitleValueObject.create('Artigo 1'),
      summary: SummaryValueObject.create('Teste resumo'),
      readingTime: ReadingTimeValueObject.create(30),
      content: ContentValueObject.create('Conteúdo 1'),
      highlightImageUrl: ImageUrlValueObject.create('https://pexels.com/test'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });
    const article2 = ArticleEntity.create({
      teacherId: '1',
      categoryId: '2',
      title: TitleValueObject.create('Artigo 2'),
      summary: SummaryValueObject.create('Teste resumo'),
      readingTime: ReadingTimeValueObject.create(30),
      content: ContentValueObject.create('Conteúdo 2'),
      highlightImageUrl: ImageUrlValueObject.create('https://pexels.com/test'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });

    articlesRepository.entities.push(article1, article2);

    const { articles } = await getAllArticlesBySearchUseCase.execute({});

    expect(articles).toHaveLength(2);
    expect(articles).toEqual(expect.arrayContaining([article1, article2]));
  });

  it('should be able to return empty list if no articles match the query', async () => {
    const article = ArticleEntity.create({
      teacherId: '1',
      categoryId: '2',
      title: TitleValueObject.create('Artigo 1'),
      summary: SummaryValueObject.create('Teste resumo'),
      readingTime: ReadingTimeValueObject.create(30),
      content: ContentValueObject.create('Conteúdo 1'),
      highlightImageUrl: ImageUrlValueObject.create('https://pexels.com/test'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });

    articlesRepository.entities.push(article);

    const { articles } = await getAllArticlesBySearchUseCase.execute({
      query: 'non-existing query',
    });

    expect(articles).toHaveLength(0);
  });
});
