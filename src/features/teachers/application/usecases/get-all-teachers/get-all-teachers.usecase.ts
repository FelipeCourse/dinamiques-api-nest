import { Injectable } from '@nestjs/common';

import { TeacherEntity } from '@/features/teachers/domain/entities/teacher.entity';
import { TeachersRepository } from '@/features/teachers/domain/repositories/teachers.repository';

type GetAllTeachersUseCaseRequest = {
  query?: string;
  page?: number;
  limit?: number;
};

type GetAllTeachersUseCaseResponse = {
  teachers: TeacherEntity[];
};

@Injectable()
export class GetAllTeachersUseCase {
  constructor(private readonly teachersRepository: TeachersRepository) {}

  public async execute(
    request: GetAllTeachersUseCaseRequest,
  ): Promise<GetAllTeachersUseCaseResponse> {
    const { query, page, limit } = request;
    const filter = query ? { name: query } : {};
    const teachers = await this.teachersRepository.getAll({
      filter,
      page,
      limit,
    });

    return {
      teachers,
    };
  }
}
