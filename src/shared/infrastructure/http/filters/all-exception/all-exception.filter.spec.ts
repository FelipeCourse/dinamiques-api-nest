import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';

import { AllExceptionFilter } from './all-exception.filter';

describe('AllExceptionFilter unit tests', () => {
  let filter: AllExceptionFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllExceptionFilter],
    }).compile();

    filter = module.get<AllExceptionFilter>(AllExceptionFilter);
  });

  it('should be able to define AllExceptionFilter', () => {
    expect(filter).toBeDefined();
  });

  it('should be able to handle HttpException and return the correct response', () => {
    const mockRequest = {
      method: 'GET',
      url: '/test-path',
    } as Request;

    const mockResponse = {
      removeHeader: jest.fn(),
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const exception = new HttpException('Not Found', HttpStatus.NOT_FOUND);

    const host: ArgumentsHost = {
      switchToHttp: () =>
        ({
          getRequest: () => mockRequest,
          getResponse: () => mockResponse,
        }) as any,
    } as ArgumentsHost;

    filter.catch(exception, host);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
  });

  it('should be able to handle generic Error and return the correct response', () => {
    const mockRequest = {
      method: 'POST',
      url: '/another-path',
    } as Request;

    const mockResponse = {
      removeHeader: jest.fn(),
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const exception = new Error('Something went wrong');

    const host: ArgumentsHost = {
      switchToHttp: () =>
        ({
          getRequest: () => mockRequest,
          getResponse: () => mockResponse,
        }) as any,
    } as ArgumentsHost;

    filter.catch(exception, host);

    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );

    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      method: 'POST',
      path: '/another-path',
      message: 'Something went wrong',
    });
  });
});
