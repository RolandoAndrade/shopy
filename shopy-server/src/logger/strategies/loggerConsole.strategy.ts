import {  Logger } from '@nestjs/common';
import { ILogger } from '../ILogger';

export class LoggerConsoleStrategy implements ILogger {
    private logger: Logger

    constructor() {
        this.logger = new Logger();
    }

    log(message: string, context: string = '') {
        this.logger.setContext(context);
        this.logger.log(message);
    }

    error(message: string, context: string = '') {
        this.logger.setContext(context);
        this.logger.error(message);
    }

    warn(message: string, context: string = '') {
        this.logger.setContext(context);
        this.logger.log(message);
    }

    debug(message: string, context: string = '') {
        this.logger.setContext(context);
        this.logger.log(message);
    }

    verbose(message: string, context: string = '') {
        this.logger.setContext(context);
        this.logger.log(message);
    }

    setContext(context: string){
        this.logger.setContext(context);
    }
}