import { Injectable } from '@nestjs/common';

import { NotFoundError } from '@/shared/domain/errors';
import { ImageUrlValueObject } from '@/shared/domain/value-objects';
import { GenderEnum } from '@/shared/enums';
import { MessageService } from '@/shared/infrastructure/services';

import { ArticlesRepository } from '@/features/articles/domain/repositories/articles.repository';
import {
  ContentValueObject,
  ReadingTimeValueObject,
  SlugValueObject,
  SummaryValueObject,
  TitleValueObject,
} from '@/features/articles/domain/value-objects';

type UpdateArticleUseCaseRequest = {
  articleId: string;
  teacherId?: string;
  categoryId?: string;
  title?: string;
  summary?: string;
  readingTime?: number;
  content?: string;
  highlightImageUrl?: string;
  isPublished?: boolean;
  updatedBy: string;
};

type UpdateArticleUseCaseResponse = void;

@Injectable()
export class UpdateArticleUseCase {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly messageService: MessageService,
  ) {}

  public async execute(
    request: UpdateArticleUseCaseRequest,
  ): Promise<UpdateArticleUseCaseResponse> {
    const {
      articleId,
      teacherId,
      categoryId,
      title,
      summary,
      readingTime,
      content,
      highlightImageUrl,
      isPublished,
      updatedBy,
    } = request;
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

    article.teacherId = teacherId || article.teacherId;
    article.categoryId = categoryId || article.categoryId;
    article.title = title
      ? TitleValueObject.create(title)
      : TitleValueObject.create(article.title.value);
    article.slug = title ? SlugValueObject.create(title) : article.slug;
    article.summary = summary
      ? SummaryValueObject.create(summary)
      : SummaryValueObject.create(article.summary.value);
    article.readingTime = readingTime
      ? ReadingTimeValueObject.create(readingTime)
      : ReadingTimeValueObject.create(article.readingTime.value);
    article.content = content
      ? ContentValueObject.create(content)
      : ContentValueObject.create(article.content.value);
    article.highlightImageUrl = highlightImageUrl
      ? ImageUrlValueObject.create(highlightImageUrl)
      : ImageUrlValueObject.create(article.highlightImageUrl.value);
    article.isPublished =
      isPublished !== undefined ? isPublished : article.isPublished;

    if (isPublished) {
      article.publishedLastDate = new Date();
    }

    article.updatedAt = new Date();
    article.updatedBy = updatedBy;

    await this.articlesRepository.update(articleId, article);
  }
}
