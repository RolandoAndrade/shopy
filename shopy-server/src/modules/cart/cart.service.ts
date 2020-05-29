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
                this.logger.log(`createCart: Actualizando el stock`,'CartService');
                await this.stockService.updateStockForCart(cart.product.id, cart.quantity, transactionEntityManager);
                this.logger.log(`createCart: Guardando el carrito`,'CartService');
                const cartTransactionRepository: Repository<Cart> = transactionEntityManager.getRepository(Cart);
                return await cartTransactionRepository.save(cart);
            } catch (error) {
                throw error;
            }
        });
    }

    /**
     * createCart
     * @param cart: Cart
     * @param id: number
     * @returns Promise<Cart>
     */
    async update(id: number, cart: Cart): Promise<boolean> {
        this.logger.log(`createCart: Actualizando un carrito de compra [cart:${JSON.stringify(cart)}]`,
            'CartService');

        return await getManager().transaction(async transactionEntityManager => {
            try {
                const cartTransactionRepository: Repository<Cart> = transactionEntityManager.getRepository(Cart);
                const q: Cart = await cartTransactionRepository.findOne(id);
                await this.stockService.updateStockForCart(cart.product.id, cart.quantity - q.quantity, transactionEntityManager);
                await cartTransactionRepository.update(id, cart);
                return true;
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


    /**
    * getCarts
    * @param userId: number
    * @returns Promise<Cart[]>
    */
    async getCarts(userId: number): Promise<Cart[]> {
        this.logger.log(`getCarts: Obteniendo el carrito de compra de un usuario [userId: ${userId}]`,
            'CartService');

        return await this.cartRepository.find({relations: ['product', 'user', 'product.productImages', 'product.stock'], where: {
            user: {
                id: userId
            },
            inProcess: false
        }})
    }

    /**
     * desactivateCarts
     * @param carts: Carts[]
     * @param transactionEntityManager: EntityManager
     * @returns Promise<Cart[]>
    */
    async desactivateCarts(carts: Cart[], transactionEntityManager: EntityManager): Promise<Cart[]>{
        this.logger.log(`desactivateCarts: Desactivando carritos de compra debido a su compra`,
            'CartService');
        
        carts.forEach(cart => {
            cart.inProcess = true;
        });

        const cartTransactionRepository: Repository<Cart> = transactionEntityManager.getRepository(Cart);
        return await cartTransactionRepository.save(carts);
    }

    /**
     * activateCarts
     * @param carts: Carts[]
     * @returns Promise<Cart[]>
    */
    async activateCarts(carts: Cart[]): Promise<Cart[]> {
        this.logger.log(`activateCarts: Activando carritos de compra debido a una compra fallida`,
            'CartService');

        carts.forEach(cart => {
            cart.inProcess = false;
        });

        return await this.cartRepository.save(carts);
    }
}
