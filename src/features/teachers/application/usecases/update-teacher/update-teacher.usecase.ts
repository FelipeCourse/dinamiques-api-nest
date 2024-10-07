import { Injectable } from '@nestjs/common';

import { NotFoundError } from '@/shared/domain/errors';
import { GenderEnum } from '@/shared/enums';
import { MessageService } from '@/shared/infrastructure/services';

import { TeachersRepository } from '@/features/teachers/domain/repositories/teachers.repository';
import { NameValueObject } from '@/features/teachers/domain/value-objects';

type UpdateTeacherUseCaseRequest = {
  teacherId: string;
  userId?: string | null;
  name?: string;
  isActive?: boolean;
  updatedBy: string;
};

type UpdateTeacherUseCaseResponse = void;

@Injectable()
export class UpdateTeacherUseCase {
  constructor(
    private readonly teachersRepository: TeachersRepository,
    private readonly messageService: MessageService,
  ) {}

  public async execute(
    request: UpdateTeacherUseCaseRequest,
  ): Promise<UpdateTeacherUseCaseResponse> {
    const { teacherId, userId, name, isActive, updatedBy } = request;
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

    if (userId === null || userId === '') {
      teacher.userId = null!;
    } else {
      teacher.userId = userId!;
    }

    teacher.name = name
      ? NameValueObject.create(name)
      : NameValueObject.create(teacher.name.value);
    teacher.isActive = isActive !== undefined ? isActive : teacher.isActive;
    teacher.updatedAt = new Date();
    teacher.updatedBy = updatedBy;

    await this.teachersRepository.update(teacherId, teacher);
  }
}
