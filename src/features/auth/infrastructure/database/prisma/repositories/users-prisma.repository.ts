import { BasePrismaRepository } from '@/shared/infrastructure/database/prisma/repositories/base-prisma.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma/services';
import { MessageService } from '@/shared/infrastructure/services';

import { UserEntity } from '@/features/auth/domain/entities/user.entity';

import { UserPrismaMapper } from '../mappers/user-prisma.mapper';

export class UsersPrismaRepository extends BasePrismaRepository<UserEntity> {
  constructor(prismaService: PrismaService, messageService: MessageService) {
    super(prismaService, messageService, 'User', UserPrismaMapper, 'Usuário');
  }

  public override async create(entity: UserEntity): Promise<void> {
    await super.create(entity, 'email');
  }

  public override async update(
    entityId: string,
    updateEntity: UserEntity,
  ): Promise<void> {
    await super.update(entityId, updateEntity, 'email');
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.client.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const mappedUser = this.modelMapper.toDomain(user);

    return mappedUser;
  }
}
