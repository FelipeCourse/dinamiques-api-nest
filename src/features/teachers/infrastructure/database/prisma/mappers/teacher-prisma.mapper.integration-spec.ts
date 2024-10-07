import { Teacher as TeacherPrisma } from '@prisma/client';

import { TeacherEntity } from '@/features/teachers/domain/entities/teacher.entity';
import { NameValueObject } from '@/features/teachers/domain/value-objects';
import { TeacherPrismaMapper } from '@/features/teachers/infrastructure/database/prisma/mappers/teacher-prisma.mapper';

describe('TeacherPrismaMapper integration tests', () => {
  it('should be able to convert TeacherPrisma to TeacherEntity format', () => {
    const rawTeacher: TeacherPrisma = {
      id: 'd6b2b7c2-53a1-4c37-8b99-3f0c70d5e6ef',
      userId: 'e8a1e5c2-53a1-4c37-8b99-3f0c00d5e4e3',
      name: 'Test Teacher',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'c6a4d46b-7992-4d7f-834e-5d024cbf1ffb',
      updatedBy: 'b4d8c0ff-fd48-4e8a-a6d7-3bb7f334e7b2',
    };

    const teacherEntity = TeacherPrismaMapper.toDomain(rawTeacher);

    expect(teacherEntity).toBeInstanceOf(TeacherEntity);
    expect(teacherEntity.id).toBe(rawTeacher.id);
    expect(teacherEntity.name.value).toBe('Test Teacher');
    expect(teacherEntity.isActive).toBe(true);
    expect(teacherEntity.createdAt).toEqual(rawTeacher.createdAt);
    expect(teacherEntity.updatedAt).toEqual(rawTeacher.updatedAt);
    expect(teacherEntity.createdBy).toBe(rawTeacher.createdBy);
    expect(teacherEntity.updatedBy).toBe(rawTeacher.updatedBy);
  });

  it('should be able to convert TeacherEntity to Prisma format', () => {
    const teacherEntity = TeacherEntity.create(
      {
        userId: 'e8a1e5c2-53a1-4c37-8b99-3f0c00d5e4e3',
        name: NameValueObject.create('Test Teacher'),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'c6a4d46b-7992-4d7f-834e-5d024cbf1ffb',
        updatedBy: 'b4d8c0ff-fd48-4e8a-a6d7-3bb7f334e7b2',
      },
      'd6b2b7c2-53a1-4c37-8b99-3f0c70d5e6ef',
    );

    const prismaTeacher = TeacherPrismaMapper.toPrisma(teacherEntity);

    expect(prismaTeacher).toMatchObject({
      id: 'd6b2b7c2-53a1-4c37-8b99-3f0c70d5e6ef',
      userId: 'e8a1e5c2-53a1-4c37-8b99-3f0c00d5e4e3',
      name: 'Test Teacher',
      isActive: true,
      createdAt: teacherEntity.createdAt,
      updatedAt: teacherEntity.updatedAt,
      createdBy: 'c6a4d46b-7992-4d7f-834e-5d024cbf1ffb',
      updatedBy: 'b4d8c0ff-fd48-4e8a-a6d7-3bb7f334e7b2',
    });
  });
});
