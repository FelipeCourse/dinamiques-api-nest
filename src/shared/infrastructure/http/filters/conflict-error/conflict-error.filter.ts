import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

import { ConflictError } from '@/shared/domain/errors';

@Catch(ConflictError)
export class ConflictErrorFilter implements ExceptionFilter {
  catch(exception: ConflictError, host: ArgumentsHost) {
    const httpContext = host.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    response.status(409).json({
      statusCode: 409,
      method: request.method,
      path: request.path,
      error: 'Conflict',
      message: exception.message,
    });
  }
}
