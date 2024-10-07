import { TeacherEntity } from '@/features/teachers/domain/entities/teacher.entity';

export class TeacherHttpMapper {
  static toHttp(teacher: TeacherEntity) {
    return {
      id: teacher.id,
      userId: teacher.userId,
      name: teacher.name.value,
      isActive: teacher.isActive,
      createdAt: teacher.createdAt,
      updatedAt: teacher.updatedAt,
      createdBy: teacher.createdBy,
      updatedBy: teacher.updatedBy,
    };
  }
}
