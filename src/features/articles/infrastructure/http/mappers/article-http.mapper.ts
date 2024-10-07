import { ArticleEntity } from '@/features/articles/domain/entities/article.entity';

export class ArticleHttpMapper {
  static toHttp(article: ArticleEntity) {
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
