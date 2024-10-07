import { Injectable } from '@nestjs/common';

import { NotFoundError } from '@/shared/domain/errors';
import { GenderEnum } from '@/shared/enums';
import { MessageService } from '@/shared/infrastructure/services';

import { ArticleEntity } from '@/features/articles/domain/entities/article.entity';
import { ArticlesRepository } from '@/features/articles/domain/repositories/articles.repository';

type GetArticleByIdUseCaseRequest = {
  articleId: string;
};

type GetArticleByIdUseCaseResponse = {
  article: ArticleEntity;
};

@Injectable()
export class GetArticleByIdUseCase {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly messageService: MessageService,
  ) {}

  public async execute(
    request: GetArticleByIdUseCaseRequest,
  ): Promise<GetArticleByIdUseCaseResponse> {
    const { articleId } = request;
    const article = await this.articlesRepository.getById(articleId);

    if (!article) {
      const { message } = this.messageService.handleMessage({
        messageType: 'error',
        resource: 'Artigo',
        action: 'notFound',
        gender: GenderEnum.MALE,
      });

      throw new NotFoundError(message);
    }

    return {
      article,
    };
  }
}
