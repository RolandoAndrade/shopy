import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, DeleteResult, EntityManager } from 'typeorm';
import { Cart } from './cart.entity';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { StockService } from '../stock/stock.service';

@Injectable()
export class CartService {

    private logger: ILogger;

    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        private readonly stockService: StockService
    ) {
        this.logger = logger;
    }

    /**
    * getCartById
    * @param cartId: number
    * @returns Promise<Cart>
    */
    async getCartById(cartId: number): Promise<Cart> {
        this.logger.log(`getCartById: Buscando el carrito de compra [cartId:${cartId}]`,
            'CartService');

        return await this.cartRepository.createQueryBuilder('cart')
                                        .innerJoinAndSelect('cart.product', 'product')
                                        .where('cart.id = :cartId', { cartId: cartId })
                                        .getOne();
    }

    /**
    * createCart
    * @param cart: Partial<Cart>
    * @returns Promise<Cart>
    */
    async createCart(cart: Partial<Cart>): Promise<Cart> {
        this.logger.log(`createCart: Creando un carrito de compra [cart:${JSON.stringify(cart)}]`,
            'CartService');

        return await getManager().transaction(async transactionEntityManager => {
            try {
                await this.stockService.updateStockForCart(cart.product.id, cart.quantity, transactionEntityManager);
                const cartTransactionRepository: Repository<Cart> = transactionEntityManager.getRepository(Cart);
                return await cartTransactionRepository.save(cart);
            } catch (error) {
                throw error;
            }
        });
    }

    /**
    * deleteCart
    * @param cartId: number
    * @returns Promise<Cart>
    */
    async deleteCart(cartId: number): Promise<DeleteResult> {
        this.logger.log(`deleteCart: Eliminando un carrito de compra [cartId:${cartId}]`,
            'CartService');
        
        let cart = await this.getCartById(cartId);

        return await getManager().transaction(async transactionEntityManager => {
            try {
                await this.stockService.updateStockForCart(cart.product.id, -cart.quantity, transactionEntityManager);
                const cartTransactionRepository: Repository<Cart> = transactionEntityManager.getRepository(Cart);
                return await cartTransactionRepository.delete(cart);
            } catch (error) {
                throw error;
            }
        });
    }

    /**
    * deleteCartsDueOrderPaid
    * @param carts: Cart[]
    * @param transactionEntityManager: EntityManager
    * @returns Promise<void>
    */
    async deleteCartsDueOrderPaid(carts: Cart[], transactionEntityManager: EntityManager): Promise<void> {
        this.logger.log(`deleteCartsDueOrderPaid: Eliminando carritos de compra de una orden pagada`,
            'CartService');
        
        const cartTransactionRepository: Repository<Cart> = transactionEntityManager.getRepository(Cart);

        for await(let cart of carts){
            await cartTransactionRepository.delete(cart);
        }
        
    }

    /**
    * getPrice
    * @param carts: Cart[]
    * @returns number
    */
    getPrice(carts: Cart[]): number {
        this.logger.log(`getPrice: Calculando precio de un conjunto de carritos de compra`,
            'CartService');

        let price = 0;
        carts.map( cart => {
            return price += (cart.quantity * cart.product.price) * (1 - cart.product.discount);
        })
        return price;
    }

    /**
    * getDescription
    * @param carts: Cart[]
    * @returns string
    */
    getDescription(carts: Cart[]): string {
        this.logger.log(`getDescription: Generando la descripción de un conjunto de carritos de compra`,
            'CartService');

        let description = '';
        carts.map(cart => {
            return description += `${cart.product.name} quantity:${cart.quantity} `;
        })
        return description;
    }
}
