import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/infrastructure/database/prisma/services';
import { EnvironmentsService } from '@/shared/infrastructure/environments/services/environments.service';
import { MessageService } from '@/shared/infrastructure/services';

import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';
import { AuthModule } from '@/features/auth/infrastructure/auth.module';
import { UsersInMemoryRepository } from '@/features/auth/infrastructure/database/in-memory/repositories/users-in-memory.repository';
import { UsersPrismaRepository } from '@/features/auth/infrastructure/database/prisma/repositories/users-prisma.repository';
import {
  CreateTeacherUseCase,
  DeleteTeacherUseCase,
  GetAllTeachersUseCase,
  GetTeacherByIdUseCase,
  UpdateTeacherUseCase,
} from '@/features/teachers/application/usecases';
import { TeachersRepository } from '@/features/teachers/domain/repositories/teachers.repository';
import { TeachersInMemoryRepository } from '@/features/teachers/infrastructure/database/in-memory/repositories/teachers-in-memory.repository';

import { TeachersPrismaRepository } from './database/prisma/repositories/teachers-prisma.repository';
import {
  CreateTeacherController,
  DeleteTeacherController,
  GetAllTeachersController,
  GetTeacherByIdController,
  UpdateTeacherController,
} from './http/controllers';

@Module({
  imports: [AuthModule],
  controllers: [
    CreateTeacherController,
    GetAllTeachersController,
    GetTeacherByIdController,
    UpdateTeacherController,
    DeleteTeacherController,
  ],
  providers: [
    PrismaService,
    {
      provide: TeachersRepository,
      useFactory: (
        environmentsService: EnvironmentsService,
        prismaService: PrismaService,
        messageService: MessageService,
      ) => {
        return environmentsService.getDatabaseInMemory()
          ? new TeachersInMemoryRepository()
          : new TeachersPrismaRepository(prismaService, messageService);
      },
      inject: [EnvironmentsService, PrismaService, MessageService],
    },
    {
      provide: UsersRepository,
      useFactory: (
        environmentsService: EnvironmentsService,
        prismaService: PrismaService,
        messageService: MessageService,
      ) => {
        return environmentsService.getDatabaseInMemory()
          ? new UsersInMemoryRepository()
          : new UsersPrismaRepository(prismaService, messageService);
      },
      inject: [EnvironmentsService, PrismaService, MessageService],
    },
    CreateTeacherUseCase,
    GetAllTeachersUseCase,
    GetTeacherByIdUseCase,
    UpdateTeacherUseCase,
    DeleteTeacherUseCase,
    MessageService,
  ],
})
export class TeachersModule {}
