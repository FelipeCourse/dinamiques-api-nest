import { Injectable } from '@nestjs/common';

import { ArticleEntity } from '@/features/articles/domain/entities/article.entity';
import { ArticlesRepository } from '@/features/articles/domain/repositories/articles.repository';

type GetAllArticlesBySearchUseCaseRequest = {
  query?: string;
  page?: number;
  limit?: number;
};

type GetAllArticlesBySearchUseCaseResponse = {
  articles: ArticleEntity[];
};

@Injectable()
export class GetAllArticlesBySearchUseCase {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  public async execute(
    request: GetAllArticlesBySearchUseCaseRequest,
  ): Promise<GetAllArticlesBySearchUseCaseResponse> {
    const { query, page, limit } = request;
    const filter = query ? { title: query, content: query } : {};
    const articles = await this.articlesRepository.getAllBySearch({
      filter,
      page,
      limit,
    });

    return {
      articles,
    };
  }
}
