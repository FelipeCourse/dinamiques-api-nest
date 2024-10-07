import { BaseInMemoryRepository } from '@/shared/infrastructure/database/in-memory/repositories/base-in-memory.repository';

import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import {
  EmailValueObject,
  PasswordValueObject,
  UsernameValueObject,
} from '@/features/auth/domain/value-objects';
import { HashService } from '@/features/auth/infrastructure/http/services';

export class UsersInMemoryRepository extends BaseInMemoryRepository<UserEntity> {
  private hashService = new HashService();

  constructor() {
    super();
    this.init();
  }

  private async init(): Promise<void> {
    const password = await this.hashService.generateHash('admin');
    const user = {
      email: EmailValueObject.create('leticia.pereira@dinamiques.com.br'),
      username: UsernameValueObject.create('leticiap'),
      password: PasswordValueObject.create(password),
    } as unknown as UserEntity;

    this.create(user);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = this.entities.find((entity) => entity.email.value === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
