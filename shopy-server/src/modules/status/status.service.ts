import { Injectable } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './status.entity';
import { 
    NEW_ORDER_ID, 
    PENDING_ORDER_ID, 
    CONFIRMING_ORDER_ID, 
    PAID_ORDER_ID, 
    INVALID_ORDER_ID, 
    EXPIRED_ORDER_ID, 
    CANCELED_ORDER_ID 
} from './status.constants';

@Injectable()
export class StatusService {

    private logger: ILogger;

    constructor(
        @InjectRepository(Status)
        private readonly statusRepository: Repository<Status>
    ) {
        this.logger = logger;
    }

    /**
    * getNewOrderStatus
    * @returns Promise<Status>
    */
    async getNewOrderStatus(): Promise<Status> {
        this.logger.log(`getNewOrderStatus: Obteniendo estatus de una orden nueva`,
            'StatusService');

        return await this.statusRepository.createQueryBuilder('status')
                                            .where('status.id = :id', { id: NEW_ORDER_ID })
                                            .getOne()
    }

    /**
    * getPendingOrderStatus
    * @returns Promise<Status>
    */
    async getPendingOrderStatus(): Promise<Status> {
        this.logger.log(`getPendingOrderStatus: Obteniendo estatus de una orden pendiente`,
            'StatusService');

        return await this.statusRepository.createQueryBuilder('status')
                                            .where('status.id = :id', { id: PENDING_ORDER_ID })
                                            .getOne()
    }

    /**
    * getConfirmingOrderStatus
    * @returns Promise<Status>
    */
    async getConfirmingOrderStatus(): Promise<Status> {
        this.logger.log(`getConfirmingOrderStatus: Obteniendo estatus de una orden confirmandose`,
            'StatusService');

        return await this.statusRepository.createQueryBuilder('status')
                                            .where('status.id = :id', { id: CONFIRMING_ORDER_ID })
                                            .getOne()
    }

    /**
    * getPaidOrderStatus
    * @returns Promise<Status>
    */
    async getPaidOrderStatus(): Promise<Status> {
        this.logger.log(`getPaidOrderStatus: Obteniendo estatus de una orden pagada`,
            'StatusService');

        return await this.statusRepository.createQueryBuilder('status')
                                            .where('status.id = :id', { id: PAID_ORDER_ID })
                                            .getOne()
    }

    /**
    * getInvalidOrderStatus
    * @returns Promise<Status>
    */
    async getInvalidOrderStatus(): Promise<Status> {
        this.logger.log(`getInvalidOrderStatus: Obteniendo estatus de una orden invalida`,
            'StatusService');

        return await this.statusRepository.createQueryBuilder('status')
                                            .where('status.id = :id', { id: INVALID_ORDER_ID })
                                            .getOne()
    }

    /**
    * getExpiredOrderStatus
    * @returns Promise<Status>
    */
    async getExpiredOrderStatus(): Promise<Status> {
        this.logger.log(`getExpiredOrderStatus: Obteniendo estatus de una orden expirada`,
            'StatusService');

        return await this.statusRepository.createQueryBuilder('status')
                                            .where('status.id = :id', { id: EXPIRED_ORDER_ID })
                                            .getOne()
    }

    /**
    * getCanceledOrderStatus
    * @returns Promise<Status>
    */
    async getCanceledOrderStatus(): Promise<Status> {
        this.logger.log(`getCanceledOrderStatus: Obteniendo estatus de una orden cancelada`,
            'StatusService');

        return await this.statusRepository.createQueryBuilder('status')
                                            .where('status.id = :id', { id: CANCELED_ORDER_ID })
                                            .getOne()
    }
}
