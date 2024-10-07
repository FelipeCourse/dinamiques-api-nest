import { User as UserPrisma } from '@prisma/client';

import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import {
  EmailValueObject,
  PasswordValueObject,
  UsernameValueObject,
} from '@/features/auth/domain/value-objects';

import { UserPrismaMapper } from './user-prisma.mapper';

describe('UserPrismaMapper integration tests', () => {
  it('should be able to convert UserPrisma to UserEntity format', () => {
    const rawUser: UserPrisma = {
      id: 'd6b2b7c2-53a1-4c37-8b99-3f0c70d5e6ef',
      email: 'jhon@test.com',
      username: 'jhonck',
      password: '123@14sad',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'c6a4d46b-7992-4d7f-834e-5d024cbf1ffb',
      updatedBy: 'b4d8c0ff-fd48-4e8a-a6d7-3bb7f334e7b2',
    };

    const userEntity = UserPrismaMapper.toDomain(rawUser);

    expect(userEntity).toBeInstanceOf(UserEntity);
    expect(userEntity.id).toBe(rawUser.id);
    expect(userEntity.email.value).toBe('jhon@test.com');
    expect(userEntity.username.value).toBe('jhonck');
    expect(userEntity.password.value).toBe('123@14sad');
    expect(userEntity.isActive).toBe(true);
    expect(userEntity.createdAt).toEqual(rawUser.createdAt);
    expect(userEntity.updatedAt).toEqual(rawUser.updatedAt);
    expect(userEntity.createdBy).toBe(rawUser.createdBy);
    expect(userEntity.updatedBy).toBe(rawUser.updatedBy);
  });

  it('should be able to convert UserEntity to Prisma format', () => {
    const userEntity = UserEntity.create(
      {
        email: EmailValueObject.create('jhon@test.com'),
        username: UsernameValueObject.create('jhonck'),
        password: PasswordValueObject.create('123@14sad'),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'c6a4d46b-7992-4d7f-834e-5d024cbf1ffb',
        updatedBy: 'b4d8c0ff-fd48-4e8a-a6d7-3bb7f334e7b2',
      },
      'd6b2b7c2-53a1-4c37-8b99-3f0c70d5e6ef',
    );

    const prismaUser = UserPrismaMapper.toPrisma(userEntity);

    expect(prismaUser).toMatchObject({
      id: 'd6b2b7c2-53a1-4c37-8b99-3f0c70d5e6ef',
      email: 'jhon@test.com',
      username: 'jhonck',
      password: '123@14sad',
      isActive: true,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
      createdBy: 'c6a4d46b-7992-4d7f-834e-5d024cbf1ffb',
      updatedBy: 'b4d8c0ff-fd48-4e8a-a6d7-3bb7f334e7b2',
    });
  });
});
