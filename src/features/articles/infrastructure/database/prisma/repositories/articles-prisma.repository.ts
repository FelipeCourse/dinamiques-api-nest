import { BasePrismaRepository } from '@/shared/infrastructure/database/prisma/repositories/base-prisma.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma/services';
import { MessageService } from '@/shared/infrastructure/services';
import { QueryType } from '@/shared/types';

import { ArticleEntity } from '@/features/articles/domain/entities/article.entity';

import { ArticlePrismaMapper } from '../mappers/article-prisma.mapper';

export class ArticlesPrismaRepository extends BasePrismaRepository<ArticleEntity> {
  constructor(prismaService: PrismaService, messageService: MessageService) {
    super(
      prismaService,
      messageService,
      'Article',
      ArticlePrismaMapper,
      'Artigo',
    );
  }

  public override async create(entity: ArticleEntity): Promise<void> {
    await super.create(entity, 'title');
  }

  public async getAllBySearch({
    filter,
    page = 1,
    limit = 10,
  }: QueryType): Promise<ArticleEntity[]> {
    const where =
      filter?.title || filter?.content
        ? {
            OR: [
              { title: { contains: filter?.title, mode: 'insensitive' } },
              { content: { contains: filter?.content, mode: 'insensitive' } },
            ],
          }
        : {};

    const resources = await this.client.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    const mappedResources = resources.map((resource: ArticleEntity) =>
      this.modelMapper.toDomain(resource),
    );

    return mappedResources;
  }

  public override async update(
    entityId: string,
    updateEntity: ArticleEntity,
  ): Promise<void> {
    await super.update(entityId, updateEntity, 'title');
  }
}
