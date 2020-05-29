import {Controller, Get} from '@nestjs/common';
import {CommissionService} from "./commission.service";
import {Commission} from "./commission.entity";

@Controller('commission')
export class CommissionController
{
    constructor(private readonly _commissionService: CommissionService) {
    }
    @Get()
    getActualCommission(): Promise<Commission>
    {
        return this._commissionService.getActiveCommission();
    }
}
