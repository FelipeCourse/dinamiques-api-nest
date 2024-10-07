import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/infrastructure/database/prisma/services';
import { EnvironmentsService } from '@/shared/infrastructure/environments/services/environments.service';
import { MessageService } from '@/shared/infrastructure/services';

import { AuthModule } from '@/features/auth/infrastructure/auth.module';
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetAllCategoriesUseCase,
  GetCategoryByIdUseCase,
  UpdateCategoryUseCase,
} from '@/features/categories/application/usecases';
import { CategoriesRepository } from '@/features/categories/domain/repositories/categories.repository';
import { CategoriesInMemoryRepository } from '@/features/categories/infrastructure/database/in-memory/repositories/categories-in-memory.repository';

import { CategoriesPrismaRepository } from './database/prisma/repositories/categories-prisma.repository';
import {
  CreateCategoryController,
  DeleteCategoryController,
  GetAllCategoriesController,
  GetCategoryByIdController,
  UpdateCategoryController,
} from './http/controllers';

@Module({
  imports: [AuthModule],
  controllers: [
    CreateCategoryController,
    GetAllCategoriesController,
    GetCategoryByIdController,
    UpdateCategoryController,
    DeleteCategoryController,
  ],
  providers: [
    PrismaService,
    {
      provide: CategoriesRepository,
      useFactory: (
        environmentsService: EnvironmentsService,
        prismaService: PrismaService,
        messageService: MessageService,
      ) => {
        return environmentsService.getDatabaseInMemory()
          ? new CategoriesInMemoryRepository()
          : new CategoriesPrismaRepository(prismaService, messageService);
      },
      inject: [EnvironmentsService, PrismaService, MessageService],
    },
    CreateCategoryUseCase,
    GetAllCategoriesUseCase,
    GetCategoryByIdUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    MessageService,
  ],
})
export class CategoriesModule {}
