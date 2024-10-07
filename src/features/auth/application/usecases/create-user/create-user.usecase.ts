import { Injectable } from '@nestjs/common';

import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';
import {
  EmailValueObject,
  PasswordValueObject,
  UsernameValueObject,
} from '@/features/auth/domain/value-objects';
import { HashService } from '@/features/auth/infrastructure/http/services';

type CreateUserUseCaseRequest = {
  email: string;
  username: string;
  password: string;
  createdBy: string;
};

type CreateUserUseCaseResponse = Partial<UserEntity>;

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService,
  ) {}

  public async execute(
    request: CreateUserUseCaseRequest,
  ): Promise<CreateUserUseCaseResponse> {
    const { email, username, password, createdBy } = request;
    const hashPassword = await this.hashService.generateHash(password);
    const user = UserEntity.create({
      email: EmailValueObject.create(email),
      username: UsernameValueObject.create(username),
      password: PasswordValueObject.create(hashPassword),
      createdBy,
    });

    await this.usersRepository.create(user);

    return {
      id: user.id,
      createdAt: user.createdAt,
    };
  }
}
