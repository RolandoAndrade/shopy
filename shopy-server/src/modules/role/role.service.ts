import { Injectable } from '@nestjs/common';
import { Role } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { GENERAL_ROL } from './role.constants';

@Injectable()
export class RoleService {

    private logger: ILogger;

    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) {
        this.logger = logger;
    }

    /**
     * getGeneralRol
     * @returns Promise<Role>
     */
    async getGeneralRol(): Promise<Role>{
        this.logger.log(`getGeneralRol: Obteniendo el rol general`,
            'RoleService');

        return await this.roleRepository.findOne({ where: { name: GENERAL_ROL } });
    }
}
