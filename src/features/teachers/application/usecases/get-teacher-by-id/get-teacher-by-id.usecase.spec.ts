import { NotFoundError } from '@/shared/domain/errors';
import { MessageService } from '@/shared/infrastructure/services';

import { TeacherEntity } from '@/features/teachers/domain/entities/teacher.entity';
import { TeachersInMemoryRepository } from '@/features/teachers/infrastructure/database/in-memory/repositories/teachers-in-memory.repository';

import { MakeTeacherFactory } from '../../../../../../test/domain/factories';
import { GetTeacherByIdUseCase } from './get-teacher-by-id.usecase';

describe('GetTeacherByIdUseCase unit tests', () => {
  let teachersRepository: TeachersInMemoryRepository;
  let messageService: MessageService;
  let getTeacherByIdUseCase: GetTeacherByIdUseCase;

  beforeEach(() => {
    teachersRepository = new TeachersInMemoryRepository();
    messageService = new MessageService();
    getTeacherByIdUseCase = new GetTeacherByIdUseCase(
      teachersRepository,
      messageService,
    );
  });

  it('should be able to get a teacher', async () => {
    const newTeacher = TeacherEntity.create(MakeTeacherFactory({}));

    teachersRepository.entities.push(newTeacher);

    const { teacher } = await getTeacherByIdUseCase.execute({
      teacherId: newTeacher.id,
    });

    expect(teachersRepository.entities).toHaveLength(1);
    expect(teacher).toMatchObject(newTeacher);
  });

  it('should not be able to get a non existing teacher', async () => {
    await expect(() =>
      getTeacherByIdUseCase.execute({ teacherId: 'fake-id' }),
    ).rejects.toThrow(new NotFoundError('Docente não encontrado.'));
  });
});
