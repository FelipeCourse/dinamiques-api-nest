import { NotFoundError } from '@/shared/domain/errors';
import { MessageService } from '@/shared/infrastructure/services';

import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import { UsersInMemoryRepository } from '@/features/auth/infrastructure/database/in-memory/repositories/users-in-memory.repository';

import { MakeUserFactory } from '../../../../../../test/domain/factories';
import { GetUserByIdUseCase } from './get-user-by-id.usecase';

describe('GetUserByIdUseCase unit tests', () => {
  let usersRepository: UsersInMemoryRepository;
  let messageService: MessageService;
  let getUserByIdUseCase: GetUserByIdUseCase;

  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository();
    messageService = new MessageService();
    getUserByIdUseCase = new GetUserByIdUseCase(
      usersRepository,
      messageService,
    );
  });

  it('should be able to get a user', async () => {
    const newUser = UserEntity.create(MakeUserFactory({}));

    usersRepository.entities.push(newUser);

    const { user } = await getUserByIdUseCase.execute({
      userId: newUser.id,
    });

    expect(usersRepository.entities).toHaveLength(1);
    expect(user).toMatchObject(newUser);
  });

  it('should not be able to get a non existing user', async () => {
    await expect(() =>
      getUserByIdUseCase.execute({ userId: 'fake-id' }),
    ).rejects.toThrow(new NotFoundError('Usuário não encontrado.'));
  });
});
