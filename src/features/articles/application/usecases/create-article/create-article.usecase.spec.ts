import { ArticlesInMemoryRepository } from '@/features/articles/infrastructure/database/in-memory/repositories/articles-in-memory.repository';

import { CreateArticleUseCase } from './create-article.usecase';

describe('CreateArticleUseCase unit tests', () => {
  let articlesRepository: ArticlesInMemoryRepository;
  let createArticleUseCase: CreateArticleUseCase;

  beforeEach(() => {
    articlesRepository = new ArticlesInMemoryRepository();
    createArticleUseCase = new CreateArticleUseCase(articlesRepository);
  });

  it('should be able to create a article', async () => {
    const article = await createArticleUseCase.execute({
      teacherId: '246ec5d0-dc65-2602-a8e1-e485eda81548',
      categoryId: '124ec5d0-dc65-5602-a8e1-e485eda81580',
      title: '  Matemática aplicada na fórmula de báskara@ ',
      summary: ' Todas as regras e definições da fórmula  ',
      readingTime: 20,
      content: '<h1>Báskara<h1><p>A fórmula...</p>',
      highlightImageUrl: 'https://pexels.com/test',
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });

    expect(articlesRepository.entities).toHaveLength(1);
    expect(articlesRepository.entities[0].id).toEqual(article.id);
  });
});
