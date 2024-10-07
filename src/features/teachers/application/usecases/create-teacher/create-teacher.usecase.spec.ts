import { TeachersInMemoryRepository } from '@/features/teachers/infrastructure/database/in-memory/repositories/teachers-in-memory.repository';

import { CreateTeacherUseCase } from './create-teacher.usecase';

describe('CreateTeacherUseCase unit tests', () => {
  let teachersRepository: TeachersInMemoryRepository;
  let createTeacherUseCase: CreateTeacherUseCase;

  beforeEach(() => {
    teachersRepository = new TeachersInMemoryRepository();
    createTeacherUseCase = new CreateTeacherUseCase(teachersRepository);
  });

  it('should be able to create a teacher', async () => {
    const teacher = await createTeacherUseCase.execute({
      userId: '415ae5c0-dc65-4602-a8e1-e485eda20521',
      name: 'Teacher test',
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });

    expect(teachersRepository.entities).toHaveLength(1);
    expect(teachersRepository.entities[0].id).toEqual(teacher.id);
  });
});
