import { Injectable } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, SelectQueryBuilder } from 'typeorm';
import { logger } from 'src/logger/loggerConst';
import { ProductParameters } from './interfaces/product-parameters';
import { PaginatedProducts } from './interfaces/paginated-products';
import {DEFAULT_PRODUCT_START_INDEX, MAX_PRODUCTS_BY_PAGE} from "../../constants/products.constants";

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
     * @returns Promise<PaginatedProducts>
    */
    async getProducts(parameters: ProductParameters): Promise<PaginatedProducts> {
        this.logger.log(`getProducts:  [parameters:${JSON.stringify(parameters)}]`,
            'ProductService');

        parameters.start = parameters.start || DEFAULT_PRODUCT_START_INDEX;
        parameters.limit = parameters.limit || MAX_PRODUCTS_BY_PAGE;

        parameters.start = parameters.start * parameters.limit - parameters.limit;

        let query: SelectQueryBuilder<Product> = this.productRepository
                                                    .createQueryBuilder('product')
                                                    .innerJoinAndSelect('product.productImages', 'images')
                                                    .innerJoin('product.stock', 'stock')
                                                    .innerJoin('product.productCategories', 'productCategories')
                                                    .innerJoin('productCategories.category', 'category')
                                                    .innerJoin('category.categoryType', 'categoryType')
        
        !(parameters.name) || query.andWhere("UPPER(product.name) LIKE :name", { name: `%${parameters.name.toUpperCase()}%` });
        !(parameters.score) || query.andWhere('FLOOR(product.score) = :score', { score: parameters.score });
        !(parameters.new) || query.andWhere('product.new = :new', { new: parameters.new });
        !(parameters.categoryId) || query.andWhere('category.id = :categoryId', { categoryId: parameters.categoryId });
        !(parameters.categoryTypeId) || query.andWhere('categoryType.id = :categoryTypeId', { categoryTypeId: parameters.categoryTypeId });
        query.andWhere('stock.quantity - stock.minimum_quantity > 0');
        
        return {
            products: await query
                .skip(parameters.start)
                .take(parameters.limit)
                .getMany(),
            productsNumber: await query.getCount()
        }
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
                        .innerJoinAndSelect('product.user', 'user')
                        .innerJoinAndSelect('product.stock', 'stock')
                        .leftJoinAndSelect('product.reviews', 'reviews')
                        .where('product.id = :id', { id: productId })
                        .getOne()
    }

}
