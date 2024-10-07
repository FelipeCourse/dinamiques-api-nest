import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

import { InvalidCredentialsError } from '@/shared/domain/errors';

@Catch(InvalidCredentialsError)
export class InvalidCredentialsErrorFilter implements ExceptionFilter {
  catch(exception: InvalidCredentialsError, host: ArgumentsHost) {
    const httpContext = host.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    response.status(400).json({
      statusCode: 400,
      method: request.method,
      path: request.path,
      error: 'Bad Request',
      message: exception.message,
    });
  }
}
