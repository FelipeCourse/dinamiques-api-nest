import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ResponseFormat<T> {
  statusCode: number;
  method: string;
  path: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseFormat<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseFormat<T>> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    response.removeHeader('X-Powered-By');
    response.setHeader(
      'Access-Control-Allow-Methods',
      'POST, GET, PUT, DELETE',
    );

    return next.handle().pipe(
      map((data) => ({
        statusCode: response.statusCode,
        method: request.method,
        path: request.path,
        ...('message' in data ? { ...data } : { data }),
      })),
    );
  }
}
