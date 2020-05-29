import { Controller, Put, UseGuards, Body, Post } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { Address } from './address.entity';
import { AddressService } from './address.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('addresses')
export class AddressController {

    private logger: ILogger;

    constructor(
        private readonly addressService: AddressService
    ) {
        this.logger = logger;
    }

    @Post()
    async createAddress(@Body() address: Address): Promise<Address>{
        this.logger.log(`createAddress: Crear una dirección`,
            'AddressController');
        
        return await this.addressService.createAddress(address);
    }

    @Put(':id')
    async updateAddress(@Body() address: Address): Promise<Address>{
        this.logger.log(`updateAddress: Actualizando una dirección`,
            'AddressController');
        
        return await this.addressService.updateAddress(address);
    }

}
