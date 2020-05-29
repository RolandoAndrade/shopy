import { Injectable } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { PaymentStatus } from './payment-status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusService } from '../status/status.service';
import { Payment } from '../payment/payment.entity';
import { Status } from '../status/status.entity';
import { PENDING_ORDER, CONFIRMING_ORDER, PAID_ORDER, INVALID_ORDER, EXPIRED_ORDER, CANCELED_ORDER } from '../status/status.constants';

@Injectable()
export class PaymentStatusService {

    private logger: ILogger;

    constructor(
        @InjectRepository(PaymentStatus)
        private readonly paymentStatusRepository: Repository<PaymentStatus>,
        private readonly statusService: StatusService
    ) {
        this.logger = logger;
    }

    /**
     *createPaymentStatus
     * @param payment: Payment
     * @param orderStatus: string
     * @returns Promise<PaymentStatus>
    */
    async createPaymentStatus(payment: Payment, orderStatus: string){
        this.logger.log(`createPaymentStatus: Creando el estatus de un pago [paymentId:${payment.id}, orderStatus:${orderStatus}]`,
            'PaymentStatusService');
        
        let status: Status;

        switch (orderStatus) {
            case PENDING_ORDER:
                status = await this.statusService.getPendingOrderStatus();
                break;
            case CONFIRMING_ORDER:
                status = await this.statusService.getConfirmingOrderStatus();
                break;
            case PAID_ORDER:
                status = await this.statusService.getPaidOrderStatus();
                break;
            case INVALID_ORDER:
                status = await this.statusService.getInvalidOrderStatus();
                break;
            case EXPIRED_ORDER:
                status = await this.statusService.getExpiredOrderStatus();
                break;
            case CANCELED_ORDER:
                status = await this.statusService.getCanceledOrderStatus();
                break;
            default:
                this.logger.error(`Ocurrio un error en el estatus del pago [statusOrder: ${orderStatus}]`)
        }

        let paymentStatus = new PaymentStatus();
        paymentStatus.date = new Date().toISOString();
        paymentStatus.payment = payment;
        paymentStatus.status = status;

        return await this.paymentStatusRepository.save(paymentStatus)
    }



}
