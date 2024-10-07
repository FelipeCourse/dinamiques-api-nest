import { UsersInMemoryRepository } from '@/features/auth/infrastructure/database/in-memory/repositories/users-in-memory.repository';
import { HashService } from '@/features/auth/infrastructure/http/services';

import { CreateUserUseCase } from './create-user.usecase';

describe('CreateUserUseCase unit tests', () => {
  let usersRepository: UsersInMemoryRepository;
  let hashService: HashService;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository();
    hashService = new HashService();
    createUserUseCase = new CreateUserUseCase(usersRepository, hashService);
  });

  it('should be able to create a user', async () => {
    const user = await createUserUseCase.execute({
      email: 'jhon@test.com',
      username: 'johnck',
      password: '12345678',
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });

    usersRepository.entities.shift();

    expect(usersRepository.entities).toHaveLength(1);
    expect(usersRepository.entities[0].id).toEqual(user.id);
  });
});
