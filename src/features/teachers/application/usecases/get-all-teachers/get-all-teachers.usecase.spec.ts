import { TeacherEntity } from '@/features/teachers/domain/entities/teacher.entity';
import { NameValueObject } from '@/features/teachers/domain/value-objects';
import { TeachersInMemoryRepository } from '@/features/teachers/infrastructure/database/in-memory/repositories/teachers-in-memory.repository';

import { GetAllTeachersUseCase } from './get-all-teachers.usecase';

describe('GetAllTeachersUseCase unit tests', () => {
  let teachersRepository: TeachersInMemoryRepository;
  let getAllTeachersUseCase: GetAllTeachersUseCase;

  beforeEach(() => {
    teachersRepository = new TeachersInMemoryRepository();
    getAllTeachersUseCase = new GetAllTeachersUseCase(teachersRepository);
  });

  it('should be able to get all teachers with filters', async () => {
    const teacher1 = TeacherEntity.create({
      name: NameValueObject.create('Teste Docente 1'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });
    const teacher2 = TeacherEntity.create({
      name: NameValueObject.create('Teste Docente 2'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });

    teachersRepository.entities.push(teacher1, teacher2);

    const query = 'Teste';
    const page = 1;
    const limit = 10;
    const { teachers } = await getAllTeachersUseCase.execute({
      query,
      page,
      limit,
    });

    expect(teachers).toHaveLength(2);
    expect(teachers).toEqual(expect.arrayContaining([teacher1, teacher2]));
  });

  it('should be able to get all teachers without filters', async () => {
    const teacher1 = TeacherEntity.create({
      name: NameValueObject.create('Teste Docente 1'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });
    const teacher2 = TeacherEntity.create({
      name: NameValueObject.create('Teste Docente 2'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });

    teachersRepository.entities.push(teacher1, teacher2);

    const { teachers } = await getAllTeachersUseCase.execute({});

    expect(teachers).toHaveLength(2);
    expect(teachers).toEqual(expect.arrayContaining([teacher1, teacher2]));
  });

  it('should be able to return empty list if no teachers match the query', async () => {
    const teacher = TeacherEntity.create({
      name: NameValueObject.create('Teste Docente 1'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });

    teachersRepository.entities.push(teacher);

    const { teachers } = await getAllTeachersUseCase.execute({
      query: 'non-existing query',
    });

    expect(teachers).toHaveLength(0);
  });
});
