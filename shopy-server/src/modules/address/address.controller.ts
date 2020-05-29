import { Controller, Put, UseGuards, Body } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { Address } from './address.entity';
import { AddressService } from './address.service';
import { AuthGuard } from '@nestjs/passport';

UseGuards(AuthGuard())
@Controller('addresses')
export class AddressController {

    private logger: ILogger;

    constructor(
        private readonly addressService: AddressService
    ) {
        this.logger = logger;
    }

    @Put(':id')
    async updateAddress(@Body() address: Address): Promise<Address>{
        this.logger.log(`updateAddress: Actualizando una dirección`,
            'AddressController');
        
        return await this.addressService.updateAddress(address);
    }

}
