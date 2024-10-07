import { Injectable } from '@nestjs/common';

import { ArticleEntity } from '@/features/articles/domain/entities/article.entity';
import { ArticlesRepository } from '@/features/articles/domain/repositories/articles.repository';

type GetAllArticlesUseCaseRequest = {
  query?: string;
  page?: number;
  limit?: number;
};

type GetAllArticlesUseCaseResponse = {
  articles: ArticleEntity[];
};

@Injectable()
export class GetAllArticlesUseCase {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  public async execute(
    request: GetAllArticlesUseCaseRequest,
  ): Promise<GetAllArticlesUseCaseResponse> {
    const { query, page, limit } = request;
    const filter = query ? { title: query, content: query } : {};
    const articles = await this.articlesRepository.getAll({
      filter,
      page,
      limit,
    });

    return {
      articles,
    };
  }
}
