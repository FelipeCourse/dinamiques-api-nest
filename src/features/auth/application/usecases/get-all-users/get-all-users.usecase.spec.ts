import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import {
  EmailValueObject,
  PasswordValueObject,
  UsernameValueObject,
} from '@/features/auth/domain/value-objects';
import { UsersInMemoryRepository } from '@/features/auth/infrastructure/database/in-memory/repositories/users-in-memory.repository';

import { GetAllUsersUseCase } from './get-all-users.usecase';

describe('GetAllUsersUseCase unit tests', () => {
  let usersRepository: UsersInMemoryRepository;
  let getAllUsersUseCase: GetAllUsersUseCase;

  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository();
    getAllUsersUseCase = new GetAllUsersUseCase(usersRepository);
  });

  it('should be able to get all users with filters', async () => {
    const user1 = UserEntity.create({
      email: EmailValueObject.create('jhon@test.com'),
      username: UsernameValueObject.create('jhonck'),
      password: PasswordValueObject.create('12345678'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });
    const user2 = UserEntity.create({
      email: EmailValueObject.create('ginna@test.com'),
      username: UsernameValueObject.create('gin.k9'),
      password: PasswordValueObject.create('das-as@sda'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });

    usersRepository.entities.push(user1, user2);

    const page = 1;
    const limit = 10;
    const { users } = await getAllUsersUseCase.execute({
      page,
      limit,
    });

    expect(users).toHaveLength(2);
    expect(users).toEqual(expect.arrayContaining([user1, user2]));
  });

  it('should be able to get all users without filters', async () => {
    const user1 = UserEntity.create({
      email: EmailValueObject.create('jhon@test.com'),
      username: UsernameValueObject.create('jhonck'),
      password: PasswordValueObject.create('12345678'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });
    const user2 = UserEntity.create({
      email: EmailValueObject.create('ginna@test.com'),
      username: UsernameValueObject.create('gin.k9'),
      password: PasswordValueObject.create('das-as@sda'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });

    usersRepository.entities.push(user1, user2);

    const { users } = await getAllUsersUseCase.execute({});

    expect(users).toHaveLength(2);
    expect(users).toEqual(expect.arrayContaining([user1, user2]));
  });

  it('should be able to return empty list if no users match the query', async () => {
    const user = UserEntity.create({
      email: EmailValueObject.create('jhon@test.com'),
      username: UsernameValueObject.create('jhonck'),
      password: PasswordValueObject.create('12345678'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });

    usersRepository.entities.push(user);

    const { users } = await getAllUsersUseCase.execute({
      query: 'non-existing query',
    });

    expect(users).toHaveLength(0);
  });
});
