import { BaseInMemoryRepository } from '@/shared/infrastructure/database/in-memory/repositories/base-in-memory.repository';

import { TeacherEntity } from '@/features/teachers/domain/entities/teacher.entity';

export class TeachersInMemoryRepository extends BaseInMemoryRepository<TeacherEntity> {}
