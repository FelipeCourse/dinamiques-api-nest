import { Article as ArticlePrisma, Prisma } from '@prisma/client';

import { ImageUrlValueObject } from '@/shared/domain/value-objects';

import { ArticleEntity } from '@/features/articles/domain/entities/article.entity';
import {
  ContentValueObject,
  ReadingTimeValueObject,
  SlugValueObject,
  SummaryValueObject,
  TitleValueObject,
} from '@/features/articles/domain/value-objects';

export class ArticlePrismaMapper {
  public static toDomain(raw: ArticlePrisma): ArticleEntity {
    return ArticleEntity.create(
      {
        teacherId: raw.teacherId,
        categoryId: raw.categoryId,
        title: TitleValueObject.create(raw.title),
        slug: SlugValueObject.create(raw.slug),
        summary: SummaryValueObject.create(raw.summary),
        readingTime: ReadingTimeValueObject.create(raw.readingTime),
        content: ContentValueObject.create(raw.content),
        highlightImageUrl: ImageUrlValueObject.create(raw.highlightImageUrl!),
        publishedLastDate: raw.publishedLastDate,
        isPublished: raw.isPublished,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        createdBy: raw.createdBy,
        updatedBy: raw.updatedBy,
      },
      raw.id,
    );
  }

  public static toPrisma(
    article: ArticleEntity,
  ): Prisma.ArticleUncheckedCreateInput {
    return {
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
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      createdBy: article.createdBy,
      updatedBy: article.updatedBy,
    };
  }
}
