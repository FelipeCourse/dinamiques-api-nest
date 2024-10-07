import { NotFoundError } from '@/shared/domain/errors';
import { GenderEnum } from '@/shared/enums';

import { NameValueObject } from '@/features/teachers/domain/value-objects';

import { UpdateTeacherUseCase } from './update-teacher.usecase';

const mockTeachersRepository = {
  getById: jest.fn(),
  update: jest.fn(),
};

const mockMessageService = {
  handleMessage: jest.fn(),
};

describe('UpdateTeacherUseCase unit tests', () => {
  let updateTeacherUseCase: UpdateTeacherUseCase;

  beforeEach(() => {
    updateTeacherUseCase = new UpdateTeacherUseCase(
      mockTeachersRepository as any,
      mockMessageService as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to update userId field when userId is provided', async () => {
    const currentTeacher = {
      name: NameValueObject.create('Docente Atual'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    mockTeachersRepository.getById.mockResolvedValue(currentTeacher);
    mockTeachersRepository.update.mockResolvedValue(undefined);

    const request = {
      teacherId: '619ec5c0-dc65-4602-a8e1-e485eda80520',
      userId: '421ef4c0-dc65-4602-a8e1-e485eda80510',
      updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    await updateTeacherUseCase.execute(request);

    expect(mockTeachersRepository.getById).toHaveBeenCalledWith(
      request.teacherId,
    );
    expect(mockTeachersRepository.update).toHaveBeenCalledWith(
      request.teacherId,
      expect.objectContaining({
        userId: '421ef4c0-dc65-4602-a8e1-e485eda80510',
      }),
    );
  });

  it('should be able to update name field when name is provided', async () => {
    const currentTeacher = {
      name: NameValueObject.create('Docente Atual'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    mockTeachersRepository.getById.mockResolvedValue(currentTeacher);
    mockTeachersRepository.update.mockResolvedValue(undefined);

    const request = {
      teacherId: '619ec5c0-dc65-4602-a8e1-e485eda80520',
      name: 'Docente Editado',
      updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    await updateTeacherUseCase.execute(request);

    expect(mockTeachersRepository.getById).toHaveBeenCalledWith(
      request.teacherId,
    );
    expect(mockTeachersRepository.update).toHaveBeenCalledWith(
      request.teacherId,
      expect.objectContaining({
        name: NameValueObject.create('Docente Editado'),
      }),
    );
  });

  it('should be able to update isActive field when isActive is provided', async () => {
    const currentTeacher = {
      name: NameValueObject.create('Docente Atual'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    mockTeachersRepository.getById.mockResolvedValue(currentTeacher);
    mockTeachersRepository.update.mockResolvedValue(undefined);

    const request = {
      teacherId: '619ec5c0-dc65-4602-a8e1-e485eda80520',
      isActive: false,
      updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    await updateTeacherUseCase.execute(request);

    expect(mockTeachersRepository.getById).toHaveBeenCalledWith(
      request.teacherId,
    );
    expect(mockTeachersRepository.update).toHaveBeenCalledWith(
      request.teacherId,
      expect.objectContaining({
        isActive: false,
      }),
    );
  });

  it('should be able to handle partial updates and not change unchanged fields', async () => {
    const currentTeacher = {
      teacherId: '619ec5c0-dc65-4602-a8e1-e485eda80520',
      name: NameValueObject.create('Docente Atual'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    mockTeachersRepository.getById.mockResolvedValue(currentTeacher);
    mockTeachersRepository.update.mockResolvedValue(undefined);

    const request = {
      teacherId: '619ec5c0-dc65-4602-a8e1-e485eda80520',
      updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    await updateTeacherUseCase.execute(request);

    expect(mockTeachersRepository.getById).toHaveBeenCalledWith(
      request.teacherId,
    );
    expect(mockTeachersRepository.update).toHaveBeenCalledWith(
      request.teacherId,
      expect.objectContaining({
        teacherId: '619ec5c0-dc65-4602-a8e1-e485eda80520',
        name: NameValueObject.create('Docente Atual'),
        updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
      }),
    );
  });

  it('should not be able to update a non existing teacher', async () => {
    mockTeachersRepository.getById.mockResolvedValue(null);
    mockMessageService.handleMessage.mockReturnValue({
      message: 'Docente não encontrado.',
    });

    await expect(
      updateTeacherUseCase.execute({
        teacherId: 'fake-id',
        updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
      }),
    ).rejects.toThrow(NotFoundError);

    expect(mockMessageService.handleMessage).toHaveBeenCalledWith({
      messageType: 'error',
      resource: 'Docente',
      action: 'notFound',
      gender: GenderEnum.MALE,
    });
  });
});
