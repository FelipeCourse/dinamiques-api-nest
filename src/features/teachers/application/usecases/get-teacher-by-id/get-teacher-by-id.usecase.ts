import { Injectable } from '@nestjs/common';

import { NotFoundError } from '@/shared/domain/errors';
import { GenderEnum } from '@/shared/enums';
import { MessageService } from '@/shared/infrastructure/services';

import { TeacherEntity } from '@/features/teachers/domain/entities/teacher.entity';
import { TeachersRepository } from '@/features/teachers/domain/repositories/teachers.repository';

type GetTeacherByIdUseCaseRequest = {
  teacherId: string;
};

type GetTeacherByIdUseCaseResponse = {
  teacher: TeacherEntity;
};

@Injectable()
export class GetTeacherByIdUseCase {
  constructor(
    private readonly teachersRepository: TeachersRepository,
    private readonly messageService: MessageService,
  ) {}

  public async execute(
    request: GetTeacherByIdUseCaseRequest,
  ): Promise<GetTeacherByIdUseCaseResponse> {
    const { teacherId } = request;
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

    return {
      teacher,
    };
  }
}
