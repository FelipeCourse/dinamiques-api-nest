import { NotFoundError } from '@/shared/domain/errors';
import { GenderEnum } from '@/shared/enums';

import {
  EmailValueObject,
  PasswordValueObject,
  UsernameValueObject,
} from '@/features/auth/domain/value-objects';

import { UpdateUserUseCase } from './update-user.usecase';

const mockUsersRepository = {
  getById: jest.fn(),
  update: jest.fn(),
};

const hasService = {
  generateHash: jest.fn(),
};

const mockMessageService = {
  handleMessage: jest.fn(),
};

describe('UpdateUserUseCase unit tests', () => {
  let updateUserUseCase: UpdateUserUseCase;

  beforeEach(() => {
    updateUserUseCase = new UpdateUserUseCase(
      mockUsersRepository as any,
      hasService as any,
      mockMessageService as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to update email field when email is provided', async () => {
    const currentUser = {
      email: EmailValueObject.create('jhon@test.com'),
      username: UsernameValueObject.create('jhonck'),
      password: PasswordValueObject.create('da@sd.cws'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    mockUsersRepository.getById.mockResolvedValue(currentUser);
    mockUsersRepository.update.mockResolvedValue(undefined);

    const request = {
      userId: '619ec5c0-dc65-4602-a8e1-e485eda80520',
      email: 'jhon97@test.com',
      updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    await updateUserUseCase.execute(request);

    expect(mockUsersRepository.getById).toHaveBeenCalledWith(request.userId);
    expect(mockUsersRepository.update).toHaveBeenCalledWith(
      request.userId,
      expect.objectContaining({
        email: EmailValueObject.create('jhon97@test.com'),
      }),
    );
  });

  it('should be able to update username field when username is provided', async () => {
    const currentUser = {
      email: EmailValueObject.create('jhon@test.com'),
      username: UsernameValueObject.create('jhonck'),
      password: PasswordValueObject.create('da@sd.cws'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    mockUsersRepository.getById.mockResolvedValue(currentUser);
    mockUsersRepository.update.mockResolvedValue(undefined);

    const request = {
      userId: '619ec5c0-dc65-4602-a8e1-e485eda80520',
      username: 'jhon_97',
      updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    await updateUserUseCase.execute(request);

    expect(mockUsersRepository.getById).toHaveBeenCalledWith(request.userId);
    expect(mockUsersRepository.update).toHaveBeenCalledWith(
      request.userId,
      expect.objectContaining({
        username: UsernameValueObject.create('jhon_97'),
      }),
    );
  });

  it('should be able to update isActive field when isActive is provided', async () => {
    const currentUser = {
      email: EmailValueObject.create('jhon@test.com'),
      username: UsernameValueObject.create('jhonck'),
      password: PasswordValueObject.create('da@sd.cws'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    mockUsersRepository.getById.mockResolvedValue(currentUser);
    mockUsersRepository.update.mockResolvedValue(undefined);

    const request = {
      userId: '619ec5c0-dc65-4602-a8e1-e485eda80520',
      isActive: false,
      updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    await updateUserUseCase.execute(request);

    expect(mockUsersRepository.getById).toHaveBeenCalledWith(request.userId);
    expect(mockUsersRepository.update).toHaveBeenCalledWith(
      request.userId,
      expect.objectContaining({
        isActive: false,
      }),
    );
  });

  it('should be able to handle partial updates and not change unchanged fields', async () => {
    const currentUser = {
      userId: '619ec5c0-dc65-4602-a8e1-e485eda80520',
      email: EmailValueObject.create('albert@test.com'),
      username: UsernameValueObject.create('alber61'),
      password: PasswordValueObject.create('al@sd#s.sa7s'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    mockUsersRepository.getById.mockResolvedValue(currentUser);
    mockUsersRepository.update.mockResolvedValue(undefined);

    const request = {
      userId: '619ec5c0-dc65-4602-a8e1-e485eda80520',
      updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    await updateUserUseCase.execute(request);

    expect(mockUsersRepository.getById).toHaveBeenCalledWith(request.userId);
    expect(mockUsersRepository.update).toHaveBeenCalledWith(
      request.userId,
      expect.objectContaining({
        userId: '619ec5c0-dc65-4602-a8e1-e485eda80520',
        password: PasswordValueObject.create('al@sd#s.sa7s'),
      }),
    );
  });

  it('should not be able to update a non existing user', async () => {
    mockUsersRepository.getById.mockResolvedValue(null);
    mockMessageService.handleMessage.mockReturnValue({
      message: 'Usuário não encontrado.',
    });

    await expect(
      updateUserUseCase.execute({
        userId: 'fake-id',
        updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
      }),
    ).rejects.toThrow(NotFoundError);

    expect(mockMessageService.handleMessage).toHaveBeenCalledWith({
      messageType: 'error',
      resource: 'Usuário',
      action: 'notFound',
      gender: GenderEnum.MALE,
    });
  });
});
