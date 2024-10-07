import { ConflictError, NotFoundError } from '@/shared/domain/errors';
import { GenderEnum } from '@/shared/enums';
import { MessageService } from '@/shared/infrastructure/services';

import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import { UsersInMemoryRepository } from '@/features/auth/infrastructure/database/in-memory/repositories/users-in-memory.repository';

import { MakeUserFactory } from '../../../../../../test/domain/factories';
import { DeleteUserUseCase } from './delete-user.usecase';

describe('DeleteUserUseCase unit tests', () => {
  let usersRepository: UsersInMemoryRepository;
  let messageService: MessageService;
  let deleteUserUseCase: DeleteUserUseCase;

  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository();
    messageService = new MessageService();
    deleteUserUseCase = new DeleteUserUseCase(usersRepository, messageService);
  });

  it('should be able to delete a user', async () => {
    const user = UserEntity.create(MakeUserFactory({}));

    usersRepository.entities.push(user);
    expect(usersRepository.entities).toHaveLength(1);
    await deleteUserUseCase.execute({ userId: user.id });
    expect(usersRepository.entities).toHaveLength(0);
  });

  it('should be able to delete (soft delete) a user', async () => {
    const user = UserEntity.create(MakeUserFactory({}));

    usersRepository.entities.push(user);
    expect(usersRepository.entities).toHaveLength(1);
    await deleteUserUseCase.execute({
      userId: user.id,
      isSoftDelete: true,
    });
    expect(usersRepository.entities).toHaveLength(1);
    expect(usersRepository.entities[0].isActive).toBe(false);
  });

  it('should not be able to delete a non existing user', async () => {
    await expect(() =>
      deleteUserUseCase.execute({ userId: 'fake-id' }),
    ).rejects.toThrow(new NotFoundError('Usuário não encontrado.'));
  });

  it('should not be able to soft delete an already deactivated user', async () => {
    const user = UserEntity.create(MakeUserFactory({}));

    user.isActive = false;
    usersRepository.entities.push(user);
    jest.spyOn(messageService, 'handleMessage').mockReturnValue({
      message: 'Usuário já está desativado.',
    });

    await expect(
      deleteUserUseCase.execute({
        userId: user.id,
        isSoftDelete: true,
      }),
    ).rejects.toThrow(ConflictError);

    expect(messageService.handleMessage).toHaveBeenCalledWith({
      messageType: 'error',
      resource: 'Usuário',
      action: 'alreadyDeactivatedConflict',
      gender: GenderEnum.MALE,
    });
  });
});
