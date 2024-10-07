import { Injectable } from '@nestjs/common';

import { NotFoundError } from '@/shared/domain/errors';
import { GenderEnum } from '@/shared/enums';
import { MessageService } from '@/shared/infrastructure/services';

import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';
import {
  EmailValueObject,
  PasswordValueObject,
  UsernameValueObject,
} from '@/features/auth/domain/value-objects';
import { HashService } from '@/features/auth/infrastructure/http/services';

type UpdateUserUseCaseRequest = {
  userId: string;
  email?: string;
  username?: string;
  password?: string;
  isActive?: boolean;
  updatedBy: string;
};

type UpdateUserUseCaseResponse = void;

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService,
    private readonly messageService: MessageService,
  ) {}

  public async execute(
    request: UpdateUserUseCaseRequest,
  ): Promise<UpdateUserUseCaseResponse> {
    const { userId, email, username, password, isActive, updatedBy } = request;
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

    user.email = email
      ? EmailValueObject.create(email)
      : EmailValueObject.create(user.email.value);
    user.username = username
      ? UsernameValueObject.create(username)
      : UsernameValueObject.create(user.username.value);

    if (password) {
      const hashPassword = await this.hashService.generateHash(password);

      user.password = PasswordValueObject.create(hashPassword);
    }

    user.isActive = isActive !== undefined ? isActive : user.isActive;
    user.updatedAt = new Date();
    user.updatedBy = updatedBy;

    await this.usersRepository.update(userId, user);
  }
}
