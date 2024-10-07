import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { EnvironmentsService } from '@/shared/infrastructure/environments/services/environments.service';

import { AuthService } from './auth.service';

describe('AuthService unit tests', () => {
  let authService: AuthService;

  const mockJwtService = {
    signAsync: jest.fn(),
    verifyAsync: jest.fn(),
  };

  const mockEnvironmentsService = {
    getJwtSecret: jest.fn().mockReturnValue('testSecret'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: EnvironmentsService,
          useValue: mockEnvironmentsService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be able to generate a JWT token', async () => {
    const userId = 'testUserId';
    const expectedToken = 'generatedToken';

    mockJwtService.signAsync.mockResolvedValue(expectedToken);

    const result = await authService.generateJwt(userId);

    expect(result).toEqual({ accessToken: expectedToken });
    expect(mockJwtService.signAsync).toHaveBeenCalledWith({ id: userId }, {});
  });

  it('should be able to verify a JWT token', async () => {
    const token = 'generatedToken';
    const payload = { id: 'testUserId' };

    mockJwtService.verifyAsync.mockResolvedValue(payload);

    const result = await authService.verifyJwt(token);

    expect(result).toEqual(payload);
    expect(mockJwtService.verifyAsync).toHaveBeenCalledWith(token, {
      secret: 'testSecret',
    });
  });
});
