import { Test, TestingModule } from '@nestjs/testing';

import { InvalidCredentialsError, NotFoundError } from '@/shared/domain/errors';
import { MessageService } from '@/shared/infrastructure/services';

import { SigninUserDto } from '@/features/auth/application/dtos';
import { SigninUserUseCase } from '@/features/auth/application/usecases';

import { SigninUserController } from './signin-user.controller';

describe('SigninUserController unit tests', () => {
  let signinUserUseCase: SigninUserUseCase;
  let messageService: MessageService;
  let signinUserController: SigninUserController;

  const mockMessageService = {
    handleMessage: jest.fn().mockReturnValue({
      message: 'Usuário autenticado com sucesso.',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SigninUserController],
      providers: [
        {
          provide: SigninUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: MessageService,
          useValue: mockMessageService,
        },
      ],
    }).compile();

    signinUserController =
      module.get<SigninUserController>(SigninUserController);
    signinUserUseCase = module.get<SigninUserUseCase>(SigninUserUseCase);
    messageService = module.get<MessageService>(MessageService);
  });

  it('should be able to define SigninUserController', () => {
    expect(signinUserController).toBeDefined();
  });

  it('should be able to authenticate a user successfully', async () => {
    const signinUserDto: SigninUserDto = {
      email: 'test@example.com',
      password: 'validPassword',
    };
    const expectedUser = {
      id: '0c97f640-4de6-4a70-8a80-4f282ba7163e',
      accessToken: 'mockAccessToken',
    };
    const expectedMessage = 'User authenticated successfully.';

    jest.spyOn(signinUserUseCase, 'execute').mockResolvedValue(expectedUser);
    jest.spyOn(messageService, 'handleMessage').mockReturnValue({
      message: expectedMessage,
    });

    const result = await signinUserController.handle(signinUserDto);

    expect(result).toEqual({
      message: expectedMessage,
      data: expectedUser,
    });
    expect(signinUserUseCase.execute).toHaveBeenCalledWith({
      email: signinUserDto.email,
      password: signinUserDto.password,
    });
  });

  it('should be able to throw NotFoundError if user is not found', async () => {
    const signinUserDto: SigninUserDto = {
      email: 'notfound@example.com',
      password: 'anyPassword',
    };

    jest
      .spyOn(signinUserUseCase, 'execute')
      .mockRejectedValue(new NotFoundError('User not found'));

    await expect(signinUserController.handle(signinUserDto)).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should be able to throw InvalidCredentialsError if credentials are invalid', async () => {
    const signinUserDto: SigninUserDto = {
      email: 'test@example.com',
      password: 'wrongPassword',
    };

    jest
      .spyOn(signinUserUseCase, 'execute')
      .mockRejectedValue(new InvalidCredentialsError('Invalid credentials'));

    await expect(signinUserController.handle(signinUserDto)).rejects.toThrow(
      InvalidCredentialsError,
    );
  });
});
