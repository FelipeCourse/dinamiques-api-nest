import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import {
  EmailValueObject,
  PasswordValueObject,
  UsernameValueObject,
} from '@/features/auth/domain/value-objects';

import { UsersInMemoryRepository } from './users-in-memory.repository';

describe('UsersInMemoryRepository unit tests', () => {
  let usersRepository: UsersInMemoryRepository;

  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository();
  });

  it('should be able to return a user when found by email', async () => {
    const user = UserEntity.create({
      email: EmailValueObject.create('jhon@test.com'),
      username: UsernameValueObject.create('jhonck'),
      password: PasswordValueObject.create('12345678'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });

    await usersRepository.create(user);

    const foundUser = await usersRepository.findByEmail('jhon@test.com');

    expect(foundUser).toEqual(user);
  });

  it('should be able to return null when no user is found by email', async () => {
    const foundUser = await usersRepository.findByEmail('nonexistent@test.com');

    expect(foundUser).toBeNull();
  });

  it('should be able to return null when the email format is invalid', async () => {
    const foundUser = await usersRepository.findByEmail('');

    expect(foundUser).toBeNull();
  });
});
