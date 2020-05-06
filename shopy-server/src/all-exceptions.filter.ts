import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { ILogger } from './logger/ILogger';
import { logger } from './logger/loggerConst';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private logger: ILogger;

    constructor() {
        this.logger = logger;
    }

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        this.logger.error(`ERROR: ${status} - PATH: ${request.url}`, 'AllExceptionsFilter');

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}