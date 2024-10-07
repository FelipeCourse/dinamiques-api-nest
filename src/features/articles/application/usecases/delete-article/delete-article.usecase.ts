import { Injectable } from '@nestjs/common';

import { NotFoundError } from '@/shared/domain/errors';
import { GenderEnum } from '@/shared/enums';
import { MessageService } from '@/shared/infrastructure/services';

import { ArticlesRepository } from '@/features/articles/domain/repositories/articles.repository';

type DeleteArticleUseCaseRequest = {
  articleId: string;
};

type DeleteArticleUseCaseResponse = void;

@Injectable()
export class DeleteArticleUseCase {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly messageService: MessageService,
  ) {}

  public async execute(
    request: DeleteArticleUseCaseRequest,
  ): Promise<DeleteArticleUseCaseResponse> {
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

    await this.articlesRepository.delete(articleId);
  }
}
