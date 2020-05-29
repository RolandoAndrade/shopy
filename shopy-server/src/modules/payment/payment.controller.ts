import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { PaymentService } from './payment.service';
import { Cart } from '../cart/cart.entity';
import { CheckoutCarts } from './interfaces/checkout-carts';
import { NewPayment } from './interfaces/new-payment';
import { OrderStatus } from './interfaces/order-status';
import { AuthGuard } from '@nestjs/passport';

@Controller('payments')
export class PaymentController {

    private logger: ILogger;

    constructor(private readonly paymentService: PaymentService) {
        this.logger = logger;
    }

    @Post('/orders')
    @UseGuards(AuthGuard())
    createOrder(@Body() checkoutCarts: CheckoutCarts): Promise<NewPayment> {
        this.logger.log('createOrder: Creando una orden',
            'PaymentController');

        return this.paymentService.createOrder(checkoutCarts);
    }

    @HttpCode(200)
    @Post('/orders/callback')
    callbackOrders(@Body() order: OrderStatus): Promise<OrderStatus> {
        this.logger.log('callbackOrders: Recibiendo callback de una orden',
            'PaymentController');

        return this.paymentService.callbackOrders(order);
    }

    @Post('/orders/cancel')
    canceledOrders(): Promise<any> {
        this.logger.log('canceledOrders: Recibiendo orden cancelada',
            'PaymentController');

        return this.paymentService.canceledOrders();
    }

    @Post('/orders/success')
    successfulOrders(): Promise<any> {
        this.logger.log('createOrder: Recibiendo orden exitosa',
            'PaymentController');

        return this.paymentService.successfulOrders();
    }
}
