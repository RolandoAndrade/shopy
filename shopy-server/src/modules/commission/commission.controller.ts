import {Controller, Get} from '@nestjs/common';
import {CommissionService} from "./commission.service";
import {Commission} from "./commission.entity";
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';

@Controller('commissions')
export class CommissionController{

    private logger: ILogger;

    constructor(
        private readonly _commissionService: CommissionService
    ) {
        this.logger = logger;
    }

    @Get()
    getActualCommission(): Promise<Commission> {
        this.logger.log(`getActualCommission: Buscando a la comision activa`,
            'CommissionController');

        return this._commissionService.getActiveCommission();
    }
}
