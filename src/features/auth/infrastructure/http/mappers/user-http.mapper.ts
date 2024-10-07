import { UserEntity } from '@/features/auth/domain/entities/user.entity';

export class UserHttpMapper {
  static toHttp(user: UserEntity) {
    return {
      id: user.id,
      email: user.email.value,
      username: user.username.value,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      createdBy: user.createdBy,
      updatedBy: user.updatedBy,
    };
  }
}
