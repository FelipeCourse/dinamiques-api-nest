import { Injectable } from '@nestjs/common';

import { ConflictError, NotFoundError } from '@/shared/domain/errors';
import { GenderEnum } from '@/shared/enums';
import { MessageService } from '@/shared/infrastructure/services';

import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';

type DeleteUserUseCaseRequest = {
  userId: string;
  isSoftDelete?: boolean;
};

type DeleteUserUseCaseResponse = void;

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly messageService: MessageService,
  ) {}

  public async execute(
    request: DeleteUserUseCaseRequest,
  ): Promise<DeleteUserUseCaseResponse> {
    const { userId, isSoftDelete = false } = request;
    const user = await this.usersRepository.getById(userId);

    if (!user) {
      const { message } = this.messageService.handleMessage({
        messageType: 'error',
        resource: 'Usuário',
        action: 'notFound',
        gender: GenderEnum.MALE,
      });

      throw new NotFoundError(message);
    }

    if (isSoftDelete && !user.isActive) {
      const { message } = this.messageService.handleMessage({
        messageType: 'error',
        resource: 'Usuário',
        action: 'alreadyDeactivatedConflict',
        gender: GenderEnum.MALE,
      });

      throw new ConflictError(message);
    }

    if (isSoftDelete) {
      await this.usersRepository.softDelete(userId);
    } else {
      await this.usersRepository.delete(userId);
    }
  }
}
