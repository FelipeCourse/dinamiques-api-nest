import { Injectable } from '@nestjs/common';

import { ConflictError, NotFoundError } from '@/shared/domain/errors';
import { GenderEnum } from '@/shared/enums';
import { MessageService } from '@/shared/infrastructure/services';

import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';
import { TeachersRepository } from '@/features/teachers/domain/repositories/teachers.repository';

type DeleteTeacherUseCaseRequest = {
  teacherId: string;
  isSoftDelete?: boolean;
};

type DeleteTeacherUseCaseResponse = void;

@Injectable()
export class DeleteTeacherUseCase {
  constructor(
    private readonly teachersRepository: TeachersRepository,
    private readonly usersRepository: UsersRepository,
    private readonly messageService: MessageService,
  ) {}

  public async execute(
    request: DeleteTeacherUseCaseRequest,
  ): Promise<DeleteTeacherUseCaseResponse> {
    const { teacherId, isSoftDelete = false } = request;
    const teacher = await this.teachersRepository.getById(teacherId);

    if (!teacher) {
      const { message } = this.messageService.handleMessage({
        messageType: 'error',
        resource: 'Docente',
        action: 'notFound',
        gender: GenderEnum.MALE,
      });

      throw new NotFoundError(message);
    }

    if (isSoftDelete && !teacher.isActive) {
      const { message } = this.messageService.handleMessage({
        messageType: 'error',
        resource: 'Docente',
        action: 'alreadyDeactivatedConflict',
        gender: GenderEnum.MALE,
      });

      throw new ConflictError(message);
    }

    if (isSoftDelete) {
      await this.teachersRepository.softDelete(teacherId);
    } else {
      await this.teachersRepository.delete(teacherId);
    }

    if (teacher.userId) {
      const userDeleteMethod = isSoftDelete
        ? this.usersRepository.softDelete
        : this.usersRepository.delete;
      await userDeleteMethod.call(this.usersRepository, teacher.userId);
    }
  }
}
