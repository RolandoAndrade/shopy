import { Injectable } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { Badge } from './badge.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DOLAR_BADGE } from './badge.constants';

@Injectable()
export class BadgeService {

    private logger: ILogger;

    constructor(
        @InjectRepository(Badge)
        private readonly badgeRepository: Repository<Badge>
    ) {
        this.logger = logger;
    }

    /**
     * getDolarBadge
     * @returns Promise<Badge>
     */
    async getDolarBadge(): Promise<Badge> {
        this.logger.log(`getDolarBadge: Obteniendo la divisa del dolar`,
            'BadgeService');

        return await this.badgeRepository.findOne({ where: { name: DOLAR_BADGE } });
    }
}
