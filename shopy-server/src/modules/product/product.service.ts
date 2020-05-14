import { Injectable } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, SelectQueryBuilder } from 'typeorm';
import { logger } from 'src/logger/loggerConst';
import { ProductParameters } from './product-paramters';

@Injectable()
export class ProductService {

    private logger: ILogger;

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {
        this.logger = logger;
    }

    /**
     * createProduct
     * @param product: Partial<Product>
     * @returns Promise<Product>
    */
    async createProduct(product: Partial<Product>): Promise<Product> {
        this.logger.log(`createProducts: [product: ${product.name}]`,
            'ProductService');

        return await getManager().transaction(async transactionEntityManager => {
            try {
                const productTransactionRepository: Repository<Product> = transactionEntityManager.getRepository(Product);
                return await productTransactionRepository.save(product);
            } catch (error) {
                this.logger.error(error, 'ProductService');
            }
        });
    }
    

    /**
     * getProducts
     * @param parameters: ProductParameters
     * @returns Promise<Product[]>
    */
    async getProducts(parameters: ProductParameters): Promise<Product[]> {
        this.logger.log(`getProducts:  [parameters:${JSON.stringify(parameters)}]`,
            'ProductService');

        parameters.start = parameters.start || 1;
        parameters.limit = parameters.limit || 10;

        parameters.start = parameters.start * parameters.limit - parameters.limit;

        let query: SelectQueryBuilder<Product> = this.productRepository
                                                    .createQueryBuilder('product')
                                                    .innerJoinAndSelect('product.productImages', 'images')
                                                    .innerJoin('product.productCategories', 'productCategories')
                                                    .innerJoin('productCategories.category', 'category')
                                                    .innerJoin('category.categoryType', 'categoryType')
        
        !(parameters.name) || query.andWhere("UPPER(product.name) LIKE :name", { name: `%${parameters.name.toUpperCase()}%` })
        !(parameters.score) || query.andWhere('FLOOR(product.score) = :score', { score: parameters.score })
        !(parameters.new) || query.andWhere('product.new = :new', { new: parameters.new })
        !(parameters.categoryId) || query.andWhere('category.id = :categoryId', { categoryId: parameters.categoryId })
        !(parameters.categoryTypeId) || query.andWhere('categoryType.id = :categoryTypeId', { categoryTypeId: parameters.categoryTypeId })
        
        return await query
                    .skip(parameters.start)
                    .take(parameters.limit)
                    .getMany()
    }

    /**
    * getProductDetail
    * @param productId: number
    * @returns Promise<Product>
    */
    async getProductDetail(productId: number): Promise<Product>{
        this.logger.log(`getProductDetail:  [productId:${productId}]`,
            'ProductService');
        
        return await this.productRepository
                        .createQueryBuilder('product')
                        .innerJoinAndSelect('product.productImages', 'images')
                        .innerJoinAndSelect('product.stock', 'stock')
                        .leftJoinAndSelect('product.reviews', 'reviews')
                        .where('product.id = :id', { id: productId })
                        .getOne()
    }

}
