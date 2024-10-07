import { BaseRepository } from '@/shared/domain/repositories/base-repository';
import { QueryType } from '@/shared/types';

import { ArticleEntity } from '../entities/article.entity';

export abstract class ArticlesRepository extends BaseRepository<ArticleEntity> {
  abstract getAllBySearch(query: QueryType): Promise<ArticleEntity[]>;
}
