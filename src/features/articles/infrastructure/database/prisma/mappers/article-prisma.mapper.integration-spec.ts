import { Article as ArticlePrisma } from '@prisma/client';

import { ImageUrlValueObject } from '@/shared/domain/value-objects';

import { ArticleEntity } from '@/features/articles/domain/entities/article.entity';
import {
  ContentValueObject,
  ReadingTimeValueObject,
  SlugValueObject,
  SummaryValueObject,
  TitleValueObject,
} from '@/features/articles/domain/value-objects';
import { ArticlePrismaMapper } from '@/features/articles/infrastructure/database/prisma/mappers/article-prisma.mapper';

describe('ArticlePrismaMapper integration tests', () => {
  it('should be able to convert ArticlePrisma to ArticleEntity format', () => {
    const rawArticle: ArticlePrisma = {
      id: '121cc5d0-dc65-5602-a8e1-e485eda81542',
      teacherId: '324ec5d0-dc65-5602-a8e1-e485eda81589',
      categoryId: '744ec5d0-dc65-5602-a8e1-e485eda81581',
      title: 'Test Title',
      slug: 'test-title',
      summary: 'Test Summary',
      readingTime: 5,
      content: 'Test Content',
      highlightImageUrl: 'https://pexels.com/test',
      publishedLastDate: new Date(),
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'user-1',
      updatedBy: 'user-1',
    };

    const articleEntity = ArticlePrismaMapper.toDomain(rawArticle);

    expect(articleEntity).toBeInstanceOf(ArticleEntity);
    expect(articleEntity.id).toBe('121cc5d0-dc65-5602-a8e1-e485eda81542');
    expect(articleEntity.teacherId).toBe(
      '324ec5d0-dc65-5602-a8e1-e485eda81589',
    );
    expect(articleEntity.categoryId).toBe(
      '744ec5d0-dc65-5602-a8e1-e485eda81581',
    );
    expect(articleEntity.title.value).toBe('Test Title');
    expect(articleEntity.slug.value).toBe('test-title');
    expect(articleEntity.summary.value).toBe('Test Summary');
    expect(articleEntity.readingTime.value).toBe(5);
    expect(articleEntity.content.value).toBe('Test Content');
    expect(articleEntity.highlightImageUrl.value).toBe(
      'https://pexels.com/test',
    );
    expect(articleEntity.publishedLastDate).toEqual(
      rawArticle.publishedLastDate,
    );
    expect(articleEntity.isPublished).toBe(true);
    expect(articleEntity.createdAt).toEqual(rawArticle.createdAt);
    expect(articleEntity.updatedAt).toEqual(rawArticle.updatedAt);
    expect(articleEntity.createdBy).toBe('user-1');
    expect(articleEntity.updatedBy).toBe('user-1');
  });

  it('should be able to convert ArticleEntity to Prisma format', () => {
    const now = new Date();

    const articleEntity = ArticleEntity.create({
      teacherId: '324ec5d0-dc65-5602-a8e1-e485eda81589',
      categoryId: '744ec5d0-dc65-5602-a8e1-e485eda81581',
      title: TitleValueObject.create('Test Title'),
      slug: SlugValueObject.create('test-title'),
      summary: SummaryValueObject.create('Test Summary'),
      readingTime: ReadingTimeValueObject.create(5),
      content: ContentValueObject.create('Test Content'),
      highlightImageUrl: ImageUrlValueObject.create('https://pexels.com/test'),
      publishedLastDate: now,
      isPublished: true,
      createdAt: now,
      updatedAt: now,
      createdBy: '124ec5d0-dc65-5602-a8e1-e485eda81580',
      updatedBy: '124ec5d0-dc65-5602-a8e1-e485eda81580',
    });

    const prismaArticle = ArticlePrismaMapper.toPrisma(articleEntity);

    expect(prismaArticle).toMatchObject({
      teacherId: '324ec5d0-dc65-5602-a8e1-e485eda81589',
      categoryId: '744ec5d0-dc65-5602-a8e1-e485eda81581',
      title: 'Test Title',
      slug: 'test-title',
      summary: 'Test Summary',
      readingTime: 5,
      content: 'Test Content',
      highlightImageUrl: 'https://pexels.com/test',
      publishedLastDate: now,
      isPublished: true,
      createdAt: now,
      updatedAt: now,
      createdBy: '124ec5d0-dc65-5602-a8e1-e485eda81580',
      updatedBy: '124ec5d0-dc65-5602-a8e1-e485eda81580',
    });
  });
});
