import { Injectable } from '@nestjs/common';
import { ILogger } from '../logger/ILogger';
import { logger } from '../logger/loggerConst';

@Injectable()
export class AppService {
  private logger: ILogger;

  constructor() {
    this.logger = logger;
  }

  getHello(): string {
    this.logger.log('Hola', 'AppService');
    return 'Hello World!';
  }
}
