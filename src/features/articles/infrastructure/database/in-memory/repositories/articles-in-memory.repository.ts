import { BaseInMemoryRepository } from '@/shared/infrastructure/database/in-memory/repositories/base-in-memory.repository';

import { ArticleEntity } from '@/features/articles/domain/entities/article.entity';

export class ArticlesInMemoryRepository extends BaseInMemoryRepository<ArticleEntity> {
  public async getAllBySearch({
    filter,
    page = 1,
    limit = 10,
  }: {
    filter: { title?: string; content?: string };
    page?: number;
    limit?: number;
  }): Promise<ArticleEntity[]> {
    const filteredArticles = this.entities.filter((article) => {
      const matchesTitle = filter.title
        ? article.title.value.includes(filter.title)
        : true;
      const matchesContent = filter.content
        ? article.content.value.includes(filter.content)
        : true;

      return matchesTitle || matchesContent;
    });
    const startIndex = (page - 1) * limit;

    return filteredArticles.slice(startIndex, startIndex + limit);
  }
}
