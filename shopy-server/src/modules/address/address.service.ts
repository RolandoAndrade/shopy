import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
@Injectable()
export class AddressService {

    private logger: ILogger;

    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>
    ) {
        this.logger = logger;
    }

    /**
     * createAddress
     * @param address: Address
     * @returns Promise<Address>
     */
    async createAddress(address: Address): Promise<Address> {
        this.logger.log(`createAddress: Creando una dirección para un usuario`,
            'AddressService');

        return await this.addressRepository.save(address);
    }

    /**
     * updateAddress
     * @param address: Address
     * @returns Promise<Address>
     */
    async updateAddress(address: Address): Promise<Address> {
        this.logger.log(`updateAddress: Actualizando una dirección [addressId: ${address.id}]`,
            'AddressService');

        return await this.addressRepository.save(address);
    }
}
