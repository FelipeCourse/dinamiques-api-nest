import { CallHandler, ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { ResponseInterceptor } from './response.interceptor';

describe('ResponseInterceptor unit tests', () => {
  let interceptor: ResponseInterceptor<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseInterceptor],
    }).compile();

    interceptor = module.get<ResponseInterceptor<any>>(ResponseInterceptor);
  });

  it('should be able to define ResponseInterceptor', () => {
    expect(interceptor).toBeDefined();
  });

  it('should be able to format the response correctly', () => {
    const mockRequest = {
      method: 'GET',
      path: '/test',
    };
    const mockResponse = {
      removeHeader: jest.fn(),
      setHeader: jest.fn(),
      statusCode: 200,
    };
    const mockData = { someData: 'value' };
    const mockFormattedResponse = {
      statusCode: 200,
      method: 'GET',
      path: '/test',
      data: { someData: 'value' },
    };

    const mockHttpArgumentsHost = {
      getRequest: () => mockRequest as any,
      getResponse: () => mockResponse as any,
      getNext: () => {},
    };
    const context: Partial<ExecutionContext> = {
      switchToHttp: () => mockHttpArgumentsHost as any,
    };
    const next: Partial<CallHandler> = {
      handle: () => of(mockData),
    };

    interceptor
      .intercept(context as ExecutionContext, next as CallHandler)
      .subscribe((result) => {
        expect(result).toEqual(mockFormattedResponse);
      });
  });

  it('should be able to include the message if present in the data', () => {
    const mockRequest = {
      method: 'POST',
      path: '/test-endpoint',
    };
    const mockResponse = {
      removeHeader: jest.fn(),
      setHeader: jest.fn(),
      statusCode: 201,
    };
    const mockData = { message: 'Operation successful' };
    const mockFormattedResponse = {
      statusCode: 201,
      method: 'POST',
      path: '/test-endpoint',
      message: 'Operation successful',
    };

    const mockHttpArgumentsHost = {
      getRequest: () => mockRequest as any,
      getResponse: () => mockResponse as any,
      getNext: () => {},
    };
    const context: Partial<ExecutionContext> = {
      switchToHttp: () => mockHttpArgumentsHost as any,
    };
    const next: Partial<CallHandler> = {
      handle: () => of(mockData),
    };

    interceptor
      .intercept(context as ExecutionContext, next as CallHandler)
      .subscribe((result) => {
        expect(result).toEqual(mockFormattedResponse);
      });
  });
});
