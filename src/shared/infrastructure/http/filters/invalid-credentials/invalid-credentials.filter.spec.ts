import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';

import { InvalidCredentialsError } from '@/shared/domain/errors';

import { InvalidCredentialsErrorFilter } from './invalid-credentials.filter';

describe('InvalidCredentialsErrorFilter unit tests', () => {
  let filter: InvalidCredentialsErrorFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvalidCredentialsErrorFilter],
    }).compile();

    filter = module.get<InvalidCredentialsErrorFilter>(
      InvalidCredentialsErrorFilter,
    );
  });

  it('should be able to define InvalidCredentialsErrorFilter', () => {
    expect(filter).toBeDefined();
  });

  it('should be able to handle InvalidCredentialsError and return the correct response', () => {
    const mockRequest = {
      method: 'POST',
      path: '/login',
    } as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const exception = new InvalidCredentialsError(
      'Invalid username or password',
    );

    const host: ArgumentsHost = {
      switchToHttp: () =>
        ({
          getRequest: () => mockRequest,
          getResponse: () => mockResponse,
        }) as unknown as any,
    } as unknown as ArgumentsHost;

    filter.catch(exception, host);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: 400,
      method: 'POST',
      path: '/login',
      error: 'Bad Request',
      message: 'Invalid username or password',
    });
  });
});
