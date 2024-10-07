import { Injectable } from '@nestjs/common';

import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';

type GetAllUsersUseCaseRequest = {
  query?: string;
  page?: number;
  limit?: number;
};

type GetAllUsersUseCaseResponse = {
  users: UserEntity[];
};

@Injectable()
export class GetAllUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute(
    request: GetAllUsersUseCaseRequest,
  ): Promise<GetAllUsersUseCaseResponse> {
    const { query, page, limit } = request;
    const filter = query ? { username: query } : {};
    const users = await this.usersRepository.getAll({
      filter,
      page,
      limit,
    });

    return {
      users,
    };
  }
}
