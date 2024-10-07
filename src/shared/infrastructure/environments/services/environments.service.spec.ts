import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { EnvironmentsService } from './environments.service';

describe('EnvironmentsService unit tests', () => {
  let environmentsService: EnvironmentsService;

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnvironmentsService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    environmentsService = module.get<EnvironmentsService>(EnvironmentsService);
  });

  it('should be able to defined', () => {
    expect(environmentsService).toBeDefined();
  });

  it('should be able to return the application port', () => {
    mockConfigService.get.mockReturnValue(4000);

    const port = environmentsService.getAppPort();

    expect(port).toBe(4000);
    expect(mockConfigService.get).toHaveBeenCalledWith('APP_PORT');
  });

  it('should be able to return default application port when APP_PORT is not set', () => {
    mockConfigService.get.mockReturnValue(undefined);

    const port = environmentsService.getAppPort();

    expect(port).toBe(3000);
    expect(mockConfigService.get).toHaveBeenCalledWith('APP_PORT');
  });

  it('should be able to return the JWT secret', () => {
    mockConfigService.get.mockReturnValue('mySecret');

    const secret = environmentsService.getJwtSecret();

    expect(secret).toBe('mySecret');
    expect(mockConfigService.get).toHaveBeenCalledWith('JWT_SECRET');
  });

  it('should be able to return the JWT expiration in seconds', () => {
    mockConfigService.get.mockReturnValue(3600);

    const expiresIn = environmentsService.getJwtExpiresInSeconds();
    expect(expiresIn).toBe(3600);
    expect(mockConfigService.get).toHaveBeenCalledWith('JWT_EXPIRES_IN');
  });

  it('should be able to return true if DATABASE_IN_MEMORY is set to true', () => {
    mockConfigService.get.mockReturnValue('true');

    const isInMemory = environmentsService.getDatabaseInMemory();

    expect(isInMemory).toBe(true);
    expect(mockConfigService.get).toHaveBeenCalledWith('DATABASE_IN_MEMORY');
  });

  it('should be able to return false if DATABASE_IN_MEMORY is set to false', () => {
    mockConfigService.get.mockReturnValue('false');

    const isInMemory = environmentsService.getDatabaseInMemory();

    expect(isInMemory).toBe(false);
    expect(mockConfigService.get).toHaveBeenCalledWith('DATABASE_IN_MEMORY');
  });

  it('should be able to return false if DATABASE_IN_MEMORY is not set', () => {
    mockConfigService.get.mockReturnValue(undefined);

    const isInMemory = environmentsService.getDatabaseInMemory();

    expect(isInMemory).toBe(false);
    expect(mockConfigService.get).toHaveBeenCalledWith('DATABASE_IN_MEMORY');
  });
});
