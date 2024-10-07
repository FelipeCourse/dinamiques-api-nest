import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ExceptionError {
  message: string;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const httpContext = host.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    response.removeHeader('X-Powered-By');
    response.setHeader(
      'Access-Control-Allow-Methods',
      'POST, GET, PUT, DELETE',
    );

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as ExceptionError)
        : { message: (exception as Error).message };

    const responseData = {
      ...{
        statusCode: status,
        method: request.method,
        path: request.url,
      },
      ...message,
    };

    response.status(status).json(responseData);
  }
}
