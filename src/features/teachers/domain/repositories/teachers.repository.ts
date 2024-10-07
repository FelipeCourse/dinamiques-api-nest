import { BaseRepository } from '@/shared/domain/repositories/base-repository';

import { TeacherEntity } from '../entities/teacher.entity';

export abstract class TeachersRepository extends BaseRepository<TeacherEntity> {}
