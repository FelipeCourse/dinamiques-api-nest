import { Injectable } from '@nestjs/common';

import { NotFoundError } from '@/shared/domain/errors';
import { GenderEnum } from '@/shared/enums';
import { MessageService } from '@/shared/infrastructure/services';

import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';

type GetUserByIdUseCaseRequest = {
  userId: string;
};

type GetUserByIdUseCaseResponse = {
  user: UserEntity;
};

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly messageService: MessageService,
  ) {}

  public async execute(
    request: GetUserByIdUseCaseRequest,
  ): Promise<GetUserByIdUseCaseResponse> {
    const { userId } = request;
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

    return {
      user,
    };
  }
}
