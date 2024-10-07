import { BaseRepository } from '@/shared/domain/repositories/base-repository';

import { UserEntity } from '../entities/user.entity';

export abstract class UsersRepository extends BaseRepository<UserEntity> {
  abstract findByEmail(email: string): Promise<UserEntity | null>;
}
