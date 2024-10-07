import { Injectable } from '@nestjs/common';

import { InvalidCredentialsError, NotFoundError } from '@/shared/domain/errors';
import { GenderEnum } from '@/shared/enums';
import { MessageService } from '@/shared/infrastructure/services';

import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';
import {
  AuthService,
  HashService,
} from '@/features/auth/infrastructure/http/services';

type SigninUserUseCaseRequest = {
  email: string;
  password: string;
};

type SigninUserUseCaseResponse = Partial<UserEntity> & {
  accessToken: string;
};

@Injectable()
export class SigninUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService,
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
  ) {}

  public async execute(
    request: SigninUserUseCaseRequest,
  ): Promise<SigninUserUseCaseResponse> {
    const { email, password } = request;

    const user = await this.usersRepository.findByEmail(email);
    const isNotFoundUserOrInactivated = !user || user.isActive === false;

    if (isNotFoundUserOrInactivated) {
      const { message } = this.messageService.handleMessage({
        messageType: 'error',
        resource: 'Usuário',
        action: 'notFound',
        gender: GenderEnum.MALE,
      });

      throw new NotFoundError(message);
    }

    const hasPasswordMatches = await this.hashService.compareHash(
      password,
      user.password.value,
    );

    if (!hasPasswordMatches) {
      const { message } = this.messageService.handleMessage({
        messageType: 'error',
        resource: 'Usuário',
        action: 'invalidCredentials',
        gender: GenderEnum.MALE,
      });

      throw new InvalidCredentialsError(message);
    }

    const { accessToken } = await this.authService.generateJwt(user.id);

    return {
      id: user.id,
      accessToken,
    };
  }
}
