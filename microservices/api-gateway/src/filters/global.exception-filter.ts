import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from '../core/logger';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}

  catch(exception: any, host: ArgumentsHost) {
    this.logger.error(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof HttpException) {
      const responsePayload =
        typeof response === 'string'
          ? { message: exception.getResponse() }
          : { payload: exception.getResponse() };

      return response.status(exception.getStatus()).json({
        ...responsePayload,
        status: 'error',
        statusCode: exception.getStatus(),
      });
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message || exception,
    });
  }
}
