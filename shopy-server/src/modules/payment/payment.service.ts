import { Injectable } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { ConfigService } from 'src/config/config.service';
import { IPaymentClient } from './interfaces/IPaymentClient';
import { CoingatePaymentStrategy } from './strategies/coingatePayment.strategy';
import { UserService } from '../user/user.service';
import { CheckoutCarts } from './interfaces/checkout-carts';
import { CartService } from '../cart/cart.service';
import { CommissionService } from '../commission/commission.service';
import { Payment } from './payment.entity';
import { getManager, Repository } from 'typeorm';
import { StatusService } from '../status/status.service';
import { PaymentStatus } from '../payment-status/payment-status.entity';
import { NewPayment } from './interfaces/new-payment'
import { OrderStatus } from './interfaces/order-status';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentStatusService } from '../payment-status/payment-status.service';
import { ORDER_PAID } from './payment.constants';
import { ShoppingHistoryService } from '../shopping-history/shopping-history.service';

@Injectable()
export class PaymentService {

    private logger: ILogger;
    private paymentClient: IPaymentClient;

    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        private readonly userService: UserService,
        private readonly cartService: CartService,
        private readonly commissionService: CommissionService,
        private readonly statusService: StatusService,
        private readonly paymentStatusService: PaymentStatusService,
        private readonly shoppingHistoryService: ShoppingHistoryService,
        private configService: ConfigService
    ) {
        this.logger = logger;
        this.paymentClient = new CoingatePaymentStrategy(configService);
    }

    /**
    * createOrder
    * @param checkoutCarts: CheckoutCarts
    * @returns Promise<any>
    */
    async createOrder(checkoutCarts: CheckoutCarts): Promise<NewPayment> {
        this.logger.log(`createOrder: Creando una orden para el usuario [userId: ${checkoutCarts.userId}]`,
            'PaymentService');
        
        checkoutCarts.cartsForCheckout.forEach( cart => {
            cart.inProcess = true;
        });
        
        const user = await this.userService.getUser(checkoutCarts.userId);
        let price = this.cartService.getPrice(checkoutCarts.cartsForCheckout);
        const commission = await this.commissionService.getActiveCommission();
        const newOrderStatus = await this.statusService.getNewOrderStatus();
        
        let payment: Payment = new Payment();
        payment.totalPrice = price + price * commission.serviceFee + price * commission.processorFee;
        payment.date = new Date().toISOString();
        payment.address = user.addresses[0];
        payment.commission = commission;
        payment.carts = checkoutCarts.cartsForCheckout;
        let paymentStatus: PaymentStatus = new PaymentStatus();
        paymentStatus.date = new Date().toISOString();
        paymentStatus.status = newOrderStatus;
        payment.paymentStatuses = [paymentStatus];

        payment = await getManager().transaction(async transactionEntityManager => {
            try {
                const paymentTransactionRepository: Repository<Payment> = transactionEntityManager.getRepository(Payment);
                return await paymentTransactionRepository.save(payment);
            } catch (error) {
                throw error;
            }
        });

        const description = this.cartService.getDescription(checkoutCarts.cartsForCheckout);
        const order = await this.paymentClient.createOrder(payment.id, payment.totalPrice, description);

        return {
            payment: payment,
            order: order
        }
    }

    /**
    * callbackOrders
    * @param order: OrderStatus
    * @returns Promise<OrderStatus>
    */
    async callbackOrders(order: OrderStatus): Promise<OrderStatus> {
        this.logger.log(`callbackOrders: Recibiendo callback de una orden`,
            'PaymentService');

        const payment = await this.getPaymentById(parseInt(order.order_id));
        await this.paymentStatusService.createPaymentStatus(payment, order.status);

        if(order.status === ORDER_PAID){
            this.shoppingHistoryService.createShoppingHistories(payment, payment.address.user);
        }
        
        return order;
    }

    async canceledOrders() {
        return {};
    }

    async successfulOrders() {
        return {};
    }

    /**
    * getPaymentById
    * @param paymentId: number
    * @returns Promise<Payment>
    */
    async getPaymentById(paymentId: number): Promise<Payment>{
        this.logger.log(`getPaymentById: Obteniendo un pago por Id [paimentId:${[paymentId]}]`,
            'PaymentService');

        return await this.paymentRepository.createQueryBuilder('payment')
                                            .leftJoinAndSelect('payment.address', 'address')
                                            .leftJoinAndSelect('address.user', 'user')
                                            .leftJoinAndSelect('payment.carts','carts')
                                            .leftJoinAndSelect('carts.product', 'product')
                                            .where('payment.id = :id', { id: paymentId })
                                            .getOne();
    }

}
