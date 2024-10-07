import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';

import { ConflictError } from '@/shared/domain/errors';

import { ConflictErrorFilter } from './conflict-error.filter';

describe('ConflictErrorFilter unit tests', () => {
  let filter: ConflictErrorFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConflictErrorFilter],
    }).compile();

    filter = module.get<ConflictErrorFilter>(ConflictErrorFilter);
  });

  it('should be able to define ConflictErrorFilter', () => {
    expect(filter).toBeDefined();
  });

  it('should be able to handle ConflictError and return the correct response', () => {
    const mockRequest = {
      method: 'POST',
      path: '/test-path',
    } as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const exception = new ConflictError('This is a conflict error');

    const host: ArgumentsHost = {
      switchToHttp: () =>
        ({
          getRequest: () => mockRequest,
          getResponse: () => mockResponse,
        }) as unknown as any,
    } as unknown as ArgumentsHost;

    filter.catch(exception, host);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: 409,
      method: 'POST',
      path: '/test-path',
      error: 'Conflict',
      message: 'This is a conflict error',
    });
  });
});
