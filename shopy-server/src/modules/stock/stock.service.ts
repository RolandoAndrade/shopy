import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Stock } from './stock.entity';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';

@Injectable()
export class StockService {

    private logger: ILogger;

    constructor(
        @InjectRepository(Stock)
        private readonly stockRepository: Repository<Stock>
    ) {
        this.logger = logger;
    }

    /**
    * getStockByProductId
    * @param productId: number
    * @returns Promise<Stock>
    */
    async getStockByProductId(productId: number): Promise<Stock> {
        this.logger.log(`getStockByProductId: Obteniendo stock del producto [productId:${ productId }]`,
            'StockService');

        return await this.stockRepository.createQueryBuilder('stock')
                                        .where('stock.product = :productId', { productId: productId })
                                        .getOne()
    }

    /**
    * updateStockForCart
    * @param productId: number
    * @param quantity: number
    * @param transactionEntityManager: EntityManager
    * @returns Promise<Boolean>
    */
    async updateStockForCart(productId: number, quantity: number, transactionEntityManager: EntityManager): Promise<Stock> {
        this.logger.log(`updateStockForCart: Actualizando el stock del producto [productId:${productId}]`,
            'StockService');

        let stock = await this.getStockByProductId(productId);

        if (stock.quantity - quantity < stock.minimumQuantity) {
            throw new BadRequestException(`No se pueden agarrar ${quantity} unidades de ese producto`);
        }
        stock.quantity -= quantity;

        const stockTransactionRepository: Repository<Stock> = transactionEntityManager.getRepository(Stock);
        return await stockTransactionRepository.save(stock);
    }
}

