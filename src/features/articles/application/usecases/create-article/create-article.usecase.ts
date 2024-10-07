import { Injectable } from '@nestjs/common';

import { ImageUrlValueObject } from '@/shared/domain/value-objects';

import { ArticleEntity } from '@/features/articles/domain/entities/article.entity';
import { ArticlesRepository } from '@/features/articles/domain/repositories/articles.repository';
import {
  ContentValueObject,
  ReadingTimeValueObject,
  SummaryValueObject,
  TitleValueObject,
} from '@/features/articles/domain/value-objects';

type CreateArticleUseCaseRequest = {
  teacherId: string;
  categoryId: string;
  title: string;
  summary: string;
  readingTime: number;
  content: string;
  highlightImageUrl: string;
  createdBy: string;
};

type CreateArticleUseCaseResponse = Partial<ArticleEntity>;

@Injectable()
export class CreateArticleUseCase {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  public async execute(
    request: CreateArticleUseCaseRequest,
  ): Promise<CreateArticleUseCaseResponse> {
    const {
      teacherId,
      categoryId,
      title,
      summary,
      readingTime,
      content,
      highlightImageUrl,
      createdBy,
    } = request;
    const article = ArticleEntity.create({
      teacherId,
      categoryId,
      title: TitleValueObject.create(title),
      summary: SummaryValueObject.create(summary),
      readingTime: ReadingTimeValueObject.create(readingTime),
      content: ContentValueObject.create(content),
      highlightImageUrl: ImageUrlValueObject.create(highlightImageUrl),
      createdBy,
    });

    await this.articlesRepository.create(article);

    return {
      id: article.id,
      createdAt: article.createdAt,
    };
  }
}
