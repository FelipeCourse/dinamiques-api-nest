import { Module } from '@nestjs/common';

import { SharedModule } from '@/shared/infrastructure/shared.module';

import { ArticlesModule } from '@/features/articles/infrastructure/articles.module';
import { AuthModule } from '@/features/auth/infrastructure/auth.module';
import { CategoriesModule } from '@/features/categories/infrastructure/categories.module';
import { TeachersModule } from '@/features/teachers/infrastructure/teachers.module';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    CategoriesModule,
    TeachersModule,
    ArticlesModule,
  ],
})
export class AppModule {}
