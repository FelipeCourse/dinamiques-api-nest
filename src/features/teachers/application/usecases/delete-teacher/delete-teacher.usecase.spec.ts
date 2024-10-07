import { ConflictError, NotFoundError } from '@/shared/domain/errors';
import { GenderEnum } from '@/shared/enums';
import { MessageService } from '@/shared/infrastructure/services';

import { UsersInMemoryRepository } from '@/features/auth/infrastructure/database/in-memory/repositories/users-in-memory.repository';
import { TeacherEntity } from '@/features/teachers/domain/entities/teacher.entity';
import { TeachersInMemoryRepository } from '@/features/teachers/infrastructure/database/in-memory/repositories/teachers-in-memory.repository';

import { MakeTeacherFactory } from '../../../../../../test/domain/factories';
import { DeleteTeacherUseCase } from './delete-teacher.usecase';

describe('DeleteTeacherUseCase unit tests', () => {
  let teachersRepository: TeachersInMemoryRepository;
  let usersRepository: UsersInMemoryRepository;
  let messageService: MessageService;
  let deleteTeacherUseCase: DeleteTeacherUseCase;

  beforeEach(() => {
    teachersRepository = new TeachersInMemoryRepository();
    usersRepository = new UsersInMemoryRepository();
    messageService = new MessageService();
    deleteTeacherUseCase = new DeleteTeacherUseCase(
      teachersRepository,
      usersRepository,
      messageService,
    );
  });

  it('should be able to delete a teacher', async () => {
    const teacher = TeacherEntity.create(MakeTeacherFactory({}));

    teachersRepository.entities.push(teacher);
    expect(teachersRepository.entities).toHaveLength(1);
    await deleteTeacherUseCase.execute({ teacherId: teacher.id });
    expect(teachersRepository.entities).toHaveLength(0);
  });

  it('should be able to delete (soft delete) a teacher', async () => {
    const teacher = TeacherEntity.create(MakeTeacherFactory({}));

    teachersRepository.entities.push(teacher);
    expect(teachersRepository.entities).toHaveLength(1);
    await deleteTeacherUseCase.execute({
      teacherId: teacher.id,
      isSoftDelete: true,
    });
    expect(teachersRepository.entities).toHaveLength(1);
    expect(teachersRepository.entities[0].isActive).toBe(false);
  });

  it('should not be able to delete a non existing teacher', async () => {
    await expect(() =>
      deleteTeacherUseCase.execute({ teacherId: 'fake-id' }),
    ).rejects.toThrow(new NotFoundError('Docente não encontrado.'));
  });

  it('should not be able to delete (soft delete) an already deactivated teacher', async () => {
    const teacher = TeacherEntity.create(MakeTeacherFactory({}));

    teacher.isActive = false;
    teachersRepository.entities.push(teacher);
    jest.spyOn(messageService, 'handleMessage').mockReturnValue({
      message: 'Docente já está desativado.',
    });

    await expect(
      deleteTeacherUseCase.execute({
        teacherId: teacher.id,
        isSoftDelete: true,
      }),
    ).rejects.toThrow(ConflictError);

    expect(messageService.handleMessage).toHaveBeenCalledWith({
      messageType: 'error',
      resource: 'Docente',
      action: 'alreadyDeactivatedConflict',
      gender: GenderEnum.MALE,
    });
  });

  it('should be able to throw ConflictError if trying to soft delete a teacher that is already inactive', async () => {
    const teacher = TeacherEntity.create(MakeTeacherFactory({}));

    teacher.isActive = false;
    teachersRepository.entities.push(teacher);
    jest.spyOn(messageService, 'handleMessage').mockReturnValue({
      message: 'Docente já está desativado.',
    });

    await expect(
      deleteTeacherUseCase.execute({
        teacherId: teacher.id,
        isSoftDelete: true,
      }),
    ).rejects.toThrow(ConflictError);

    expect(messageService.handleMessage).toHaveBeenCalled();
  });

  it('should be able to delete (soft delete) the associated user when a teacher is deleted', async () => {
    const teacher = TeacherEntity.create(
      MakeTeacherFactory({ userId: 'user-id-123' }),
    );

    teachersRepository.entities.push(teacher);
    jest.spyOn(usersRepository, 'delete').mockResolvedValue(undefined);

    await deleteTeacherUseCase.execute({ teacherId: teacher.id });

    expect(usersRepository.delete).toHaveBeenCalledWith('user-id-123');
  });

  it('should be ablet to delete (soft delete) the associated user when a teacher is soft deleted', async () => {
    const teacher = TeacherEntity.create(
      MakeTeacherFactory({ userId: 'user-id-123' }),
    );

    teachersRepository.entities.push(teacher);
    jest.spyOn(usersRepository, 'softDelete').mockResolvedValue(undefined);

    await deleteTeacherUseCase.execute({
      teacherId: teacher.id,
      isSoftDelete: true,
    });

    expect(usersRepository.softDelete).toHaveBeenCalledWith('user-id-123');
  });
});
