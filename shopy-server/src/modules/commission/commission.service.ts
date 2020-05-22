import { Injectable } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { Commission } from './commission.entity';
import { logger } from 'src/logger/loggerConst';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommissionService {

    private logger: ILogger;

    constructor(
        @InjectRepository(Commission)
        private readonly commissionRepository: Repository<Commission>
    ) {
        this.logger = logger;
    }

    /** 
     * getActiveComission
     * @returns Commission
    */
    async getActiveCommission(): Promise<Commission> {
        this.logger.log(`getActiveCommission: Buscando a la comision activa`,
            'CommissionService');

        return this.commissionRepository.createQueryBuilder('commission')
                                        .where('commission.active = true')
                                        .getOne();
    }
}
