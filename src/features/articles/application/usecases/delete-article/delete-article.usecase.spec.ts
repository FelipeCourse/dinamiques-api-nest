import { NotFoundError } from '@/shared/domain/errors';
import { MessageService } from '@/shared/infrastructure/services';

import { ArticleEntity } from '@/features/articles/domain/entities/article.entity';
import { ArticlesInMemoryRepository } from '@/features/articles/infrastructure/database/in-memory/repositories/articles-in-memory.repository';

import { MakeArticleFactory } from '../../../../../../test/domain/factories';
import { DeleteArticleUseCase } from './delete-article.usecase';

describe('DeleteArticleUseCase unit tests', () => {
  let articlesRepository: ArticlesInMemoryRepository;
  let messageService: MessageService;
  let deleteArticleUseCase: DeleteArticleUseCase;

  beforeEach(() => {
    articlesRepository = new ArticlesInMemoryRepository();
    messageService = new MessageService();
    deleteArticleUseCase = new DeleteArticleUseCase(
      articlesRepository,
      messageService,
    );
  });

  it('should be able to delete a article', async () => {
    const article = ArticleEntity.create(MakeArticleFactory({}));

    articlesRepository.entities.push(article);
    expect(articlesRepository.entities).toHaveLength(1);
    await deleteArticleUseCase.execute({ articleId: article.id });
    expect(articlesRepository.entities).toHaveLength(0);
  });

  it('should not be able to delete a non existing article', async () => {
    await expect(() =>
      deleteArticleUseCase.execute({ articleId: 'fake-id' }),
    ).rejects.toThrow(new NotFoundError('Artigo não encontrado.'));
  });
});
