import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

import { NotFoundError } from '@/shared/domain/errors';

@Catch(NotFoundError)
export class NotFoundErrorFilter implements ExceptionFilter {
  catch(exception: NotFoundError, host: ArgumentsHost) {
    const httpContext = host.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    response.status(404).json({
      statusCode: 404,
      method: request.method,
      path: request.path,
      error: 'Not Found',
      message: exception.message,
    });
  }
}
