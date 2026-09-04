import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const responsePayload = exception.getResponse();
      const message =
        typeof responsePayload === 'string'
          ? responsePayload
          : Array.isArray((responsePayload as { message?: unknown }).message)
            ? (responsePayload as { message: unknown[] }).message.join(', ')
            : String((responsePayload as { message?: unknown }).message ?? 'Request failed');
      const error =
        typeof responsePayload === 'string'
          ? exception.name
          : String((responsePayload as { error?: unknown }).error ?? exception.name);

      response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        path: request.url,
        timestamp: new Date().toISOString(),
        message,
        error,
      });
      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      path: request.url,
      timestamp: new Date().toISOString(),
      message: 'Internal server error',
      error: 'Internal server error',
    });
  }
}
