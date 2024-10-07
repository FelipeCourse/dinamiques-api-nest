import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/infrastructure/database/prisma/services';
import { EnvironmentsService } from '@/shared/infrastructure/environments/services/environments.service';
import { MessageService } from '@/shared/infrastructure/services';

import {
  CreateArticleUseCase,
  DeleteArticleUseCase,
  GetAllArticlesBySearchUseCase,
  GetAllArticlesUseCase,
  GetArticleByIdUseCase,
  UpdateArticleUseCase,
} from '@/features/articles/application/usecases';
import { ArticlesRepository } from '@/features/articles/domain/repositories/articles.repository';
import { ArticlesInMemoryRepository } from '@/features/articles/infrastructure/database/in-memory/repositories/articles-in-memory.repository';
import { AuthModule } from '@/features/auth/infrastructure/auth.module';

import { ArticlesPrismaRepository } from './database/prisma/repositories/articles-prisma.repository';
import {
  CreateArticleController,
  DeleteArticleController,
  GetAllArticlesBySearchController,
  GetAllArticlesController,
  GetArticleByIdController,
  UpdateArticleController,
} from './http/controllers';

@Module({
  imports: [AuthModule],
  controllers: [
    CreateArticleController,
    GetAllArticlesController,
    GetAllArticlesBySearchController,
    GetArticleByIdController,
    UpdateArticleController,
    DeleteArticleController,
  ],
  providers: [
    PrismaService,
    {
      provide: ArticlesRepository,
      useFactory: (
        environmentsService: EnvironmentsService,
        prismaService: PrismaService,
        messageService: MessageService,
      ) => {
        return environmentsService.getDatabaseInMemory()
          ? new ArticlesInMemoryRepository()
          : new ArticlesPrismaRepository(prismaService, messageService);
      },
      inject: [EnvironmentsService, PrismaService, MessageService],
    },
    CreateArticleUseCase,
    GetAllArticlesUseCase,
    GetArticleByIdUseCase,
    GetAllArticlesBySearchUseCase,
    UpdateArticleUseCase,
    DeleteArticleUseCase,
    MessageService,
  ],
})
export class ArticlesModule {}
