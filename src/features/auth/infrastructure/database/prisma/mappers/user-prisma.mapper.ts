import { Prisma, User as UserPrisma } from '@prisma/client';

import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import {
  EmailValueObject,
  PasswordValueObject,
  UsernameValueObject,
} from '@/features/auth/domain/value-objects';

export class UserPrismaMapper {
  public static toDomain(raw: UserPrisma): UserEntity {
    return UserEntity.create(
      {
        email: EmailValueObject.create(raw.email),
        username: UsernameValueObject.create(raw.username),
        password: PasswordValueObject.create(raw.password),
        isActive: raw.isActive,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        createdBy: raw.createdBy,
        updatedBy: raw.updatedBy,
      },
      raw.id,
    );
  }

  public static toPrisma(user: UserEntity): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id,
      email: user.email.value,
      username: user.username.value,
      password: user.password.value,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      createdBy: user.createdBy,
      updatedBy: user.updatedBy,
    };
  }
}
