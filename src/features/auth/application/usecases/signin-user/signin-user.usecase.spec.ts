import { Test, TestingModule } from '@nestjs/testing';

import { InvalidCredentialsError, NotFoundError } from '@/shared/domain/errors';
import { MessageService } from '@/shared/infrastructure/services';

import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';
import {
  EmailValueObject,
  PasswordValueObject,
  UsernameValueObject,
} from '@/features/auth/domain/value-objects';
import {
  AuthService,
  HashService,
} from '@/features/auth/infrastructure/http/services';

import { SigninUserUseCase } from './signin-user.usecase';

describe('SigninUserUseCase unit tests', () => {
  let useCase: SigninUserUseCase;
  let usersRepository: UsersRepository;
  let hashService: HashService;
  let authService: AuthService;
  let messageService: MessageService;

  const mockUser = UserEntity.create({
    email: EmailValueObject.create('jhon@test.com'),
    username: UsernameValueObject.create('jhonck'),
    password: PasswordValueObject.create('12345678'),
    createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
  });

  const mockJwtResponse = { accessToken: 'mockAccessToken' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SigninUserUseCase,
        {
          provide: UsersRepository,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: HashService,
          useValue: {
            compareHash: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            generateJwt: jest.fn(),
          },
        },
        {
          provide: MessageService,
          useValue: {
            handleMessage: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<SigninUserUseCase>(SigninUserUseCase);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    hashService = module.get<HashService>(HashService);
    authService = module.get<AuthService>(AuthService);
    messageService = module.get<MessageService>(MessageService);
  });

  it('should be able to return an access token when logging in with valid credentials', async () => {
    usersRepository.findByEmail = jest.fn().mockResolvedValue(mockUser);
    hashService.compareHash = jest.fn().mockResolvedValue(true);
    authService.generateJwt = jest.fn().mockResolvedValue(mockJwtResponse);

    const request = { email: 'test@example.com', password: 'correctPassword' };
    const response = await useCase.execute(request);

    expect(response).toEqual({
      id: mockUser.id,
      accessToken: mockJwtResponse.accessToken,
    });
  });

  it('should be able to throw NotFoundError if the user is not found', async () => {
    usersRepository.findByEmail = jest.fn().mockResolvedValue(null);
    messageService.handleMessage = jest
      .fn()
      .mockReturnValue({ message: 'Usuário não encontrado.' });

    const request = {
      email: 'nonexistent@example.com',
      password: 'anyPassword',
    };

    await expect(useCase.execute(request)).rejects.toThrow(NotFoundError);
  });

  it('should be able to throw InvalidCredentialsError if the password is incorrect', async () => {
    usersRepository.findByEmail = jest.fn().mockResolvedValue(mockUser);
    hashService.compareHash = jest.fn().mockResolvedValue(false);
    messageService.handleMessage = jest
      .fn()
      .mockReturnValue({ message: 'Usuário com credenciais inválidas.' });

    const request = { email: 'test@example.com', password: 'wrongPassword' };

    await expect(useCase.execute(request)).rejects.toThrow(
      InvalidCredentialsError,
    );
  });
});
