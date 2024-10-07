import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from '@/features/auth/infrastructure/http/services';

import { AuthGuard } from './auth.guard';

describe('AuthGuard unit tests', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;

  const mockAuthService = {
    verifyJwt: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be able to throw UnauthorizedException if no token is provided', async () => {
    const mockContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({ headers: {} }),
      }),
    } as unknown as ExecutionContext;

    await expect(authGuard.canActivate(mockContext)).rejects.toThrow(
      UnauthorizedException,
    );

    expect(authService).toBeDefined();
  });

  it('should be able to throw UnauthorizedException if token is invalid', async () => {
    const mockToken = 'invalidToken';
    const mockContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            authorization: `Bearer ${mockToken}`,
          },
        }),
      }),
    } as unknown as ExecutionContext;

    mockAuthService.verifyJwt.mockRejectedValue(new Error());

    await expect(authGuard.canActivate(mockContext)).rejects.toThrow(
      UnauthorizedException,
    );

    expect(authService).toBeDefined();
  });

  it('should be able to call verifyJwt of the AuthService and return true for valid token', async () => {
    const mockToken = 'validToken';
    const mockUser = { id: 'userId' };
    const mockContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            authorization: `Bearer ${mockToken}`,
          },
        }),
      }),
    } as unknown as ExecutionContext;

    mockAuthService.verifyJwt.mockResolvedValue(mockUser);

    const result = await authGuard.canActivate(mockContext);

    expect(result).toBe(true);
    expect(mockAuthService.verifyJwt).toHaveBeenCalledWith(mockToken);
    expect(mockContext.switchToHttp().getRequest().user).toEqual(mockUser);
    expect(authService).toBeDefined();
  });
});
