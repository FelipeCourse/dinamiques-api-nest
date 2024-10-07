import { Prisma, Teacher as TeacherPrisma } from '@prisma/client';

import { TeacherEntity } from '@/features/teachers/domain/entities/teacher.entity';
import { NameValueObject } from '@/features/teachers/domain/value-objects';

export class TeacherPrismaMapper {
  public static toDomain(raw: TeacherPrisma): TeacherEntity {
    return TeacherEntity.create(
      {
        userId: raw.userId!,
        name: NameValueObject.create(raw.name),
        isActive: raw.isActive,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        createdBy: raw.createdBy,
        updatedBy: raw.updatedBy,
      },
      raw.id,
    );
  }

  public static toPrisma(
    teacher: TeacherEntity,
  ): Prisma.TeacherUncheckedCreateInput {
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
