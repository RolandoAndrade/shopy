import { Injectable } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { Payment } from '../payment/payment.entity';
import { User } from '../user/user.entity';
import { getManager, Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { ShoppingHistory } from './shopping-history.entity';

@Injectable()
export class ShoppingHistoryService {

    private logger: ILogger;

    constructor(
        private readonly cartService: CartService
    ) {
        this.logger = logger;
    }

    /**
     * createShoppingHistories
     * @param payment: Payment
     * @param user: User
     * @returns Promise<void>
     */
    async createShoppingHistories(payment: Payment, user: User): Promise<void>{
        this.logger.log(`createShoppingHistories: Creando historiales de pago [paymentId:${payment.id}, userId:${user.id}]`,
            'ShoppingHistoryService');

        await getManager().transaction(async transactionEntityManager => {
            try {
                const shoppingHistoryTransactionRepository: Repository<ShoppingHistory> = transactionEntityManager.getRepository(ShoppingHistory);
                
                for await (let cart of payment.carts){
                    let shoppingHistory = new ShoppingHistory();
                    shoppingHistory.price = this.cartService.getPrice([cart]);
                    shoppingHistory.quantity = cart.quantity;
                    shoppingHistory.payment = payment;
                    shoppingHistory.user = user;
                    shoppingHistory.product = cart.product;
                    await shoppingHistoryTransactionRepository.save(shoppingHistory);
                }

                await this.cartService.deleteCartsDueOrderPaid(payment.carts, transactionEntityManager);
                
            } catch (error) {
                throw error;
            }
        });
    }
}
