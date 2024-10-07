import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';

import { NotFoundError } from '@/shared/domain/errors';

import { NotFoundErrorFilter } from './not-found-error.filter';

describe('NotFoundErrorFilter unit tests', () => {
  let filter: NotFoundErrorFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotFoundErrorFilter],
    }).compile();

    filter = module.get<NotFoundErrorFilter>(NotFoundErrorFilter);
  });

  it('should be able to define NotFoundErrorFilter', () => {
    expect(filter).toBeDefined();
  });

  it('should be able to handle NotFoundError and return the correct response', () => {
    const mockRequest = {
      method: 'GET',
      path: '/test-path',
    } as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const exception = new NotFoundError('Resource not found');

    const host: ArgumentsHost = {
      switchToHttp: () =>
        ({
          getRequest: () => mockRequest,
          getResponse: () => mockResponse,
        }) as unknown as any,
    } as unknown as ArgumentsHost;

    filter.catch(exception, host);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: 404,
      method: 'GET',
      path: '/test-path',
      error: 'Not Found',
      message: 'Resource not found',
    });
  });
});
