import { NotFoundError } from '@/shared/domain/errors';
import { MessageService } from '@/shared/infrastructure/services';

import { ArticleEntity } from '@/features/articles/domain/entities/article.entity';
import { ArticlesInMemoryRepository } from '@/features/articles/infrastructure/database/in-memory/repositories/articles-in-memory.repository';

import { MakeArticleFactory } from '../../../../../../test/domain/factories';
import { GetArticleByIdUseCase } from './get-article-by-id.usecase';

describe('GetArticleByIdUseCase unit tests', () => {
  let articlesRepository: ArticlesInMemoryRepository;
  let messageService: MessageService;
  let getArticleByIdUseCase: GetArticleByIdUseCase;

  beforeEach(() => {
    articlesRepository = new ArticlesInMemoryRepository();
    messageService = new MessageService();
    getArticleByIdUseCase = new GetArticleByIdUseCase(
      articlesRepository,
      messageService,
    );
  });

  it('should be able to get a article', async () => {
    const newArticle = ArticleEntity.create(MakeArticleFactory({}));

    articlesRepository.entities.push(newArticle);

    const { article } = await getArticleByIdUseCase.execute({
      articleId: newArticle.id,
    });

    expect(articlesRepository.entities).toHaveLength(1);
    expect(article).toMatchObject(newArticle);
  });

  it('should not be able to get a non existing article', async () => {
    await expect(() =>
      getArticleByIdUseCase.execute({ articleId: 'fake-id' }),
    ).rejects.toThrow(new NotFoundError('Artigo não encontrado.'));
  });
});
