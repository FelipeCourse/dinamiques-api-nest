import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from '@/shared/infrastructure/database/prisma/services';
import { EnvironmentsService } from '@/shared/infrastructure/environments/services/environments.service';
import { MessageService } from '@/shared/infrastructure/services';

import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  SigninUserUseCase,
  UpdateUserUseCase,
} from '@/features/auth/application/usecases';
import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';
import { UsersInMemoryRepository } from '@/features/auth/infrastructure/database/in-memory/repositories/users-in-memory.repository';

import { UsersPrismaRepository } from './database/prisma/repositories/users-prisma.repository';
import {
  CreateUserController,
  DeleteUserController,
  GetAllUsersController,
  GetUserByIdController,
  SigninUserController,
  UpdateUserController,
} from './http/controllers';
import { AuthService, HashService } from './http/services';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (environmentsService: EnvironmentsService) => ({
        global: true,
        secret: environmentsService.getJwtSecret(),
        signOptions: {
          expiresIn: environmentsService.getJwtExpiresInSeconds(),
        },
      }),
      inject: [EnvironmentsService],
    }),
  ],
  controllers: [
    CreateUserController,
    GetAllUsersController,
    GetUserByIdController,
    UpdateUserController,
    DeleteUserController,
    SigninUserController,
  ],
  providers: [
    HashService,
    AuthService,
    PrismaService,
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
    CreateUserUseCase,
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    SigninUserUseCase,
    MessageService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
