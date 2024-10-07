import { Injectable } from '@nestjs/common';

import { TeacherEntity } from '@/features/teachers/domain/entities/teacher.entity';
import { TeachersRepository } from '@/features/teachers/domain/repositories/teachers.repository';
import { NameValueObject } from '@/features/teachers/domain/value-objects';

type CreateTeacherUseCaseRequest = {
  userId: string;
  name: string;
  createdBy: string;
};

type CreateTeacherUseCaseResponse = Partial<TeacherEntity>;

@Injectable()
export class CreateTeacherUseCase {
  constructor(private readonly teachersRepository: TeachersRepository) {}

  public async execute(
    request: CreateTeacherUseCaseRequest,
  ): Promise<CreateTeacherUseCaseResponse> {
    const { userId, name, createdBy } = request;
    const teacher = TeacherEntity.create({
      userId,
      name: NameValueObject.create(name),
      createdBy,
    });

    await this.teachersRepository.create(teacher);

    return {
      id: teacher.id,
      createdAt: teacher.createdAt,
    };
  }
}
