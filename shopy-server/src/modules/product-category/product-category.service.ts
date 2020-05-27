import { Injectable } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { ProductCategory } from './product-category.entity';
import { EntityManager, DeleteResult } from 'typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductCategoryService {

    private logger: ILogger;

    constructor(
        @InjectRepository(ProductCategory)
        private readonly productCategoryRepository: Repository<ProductCategory>,
    ) {
        this.logger = logger;
    }

    /**
    * createProductCategories
    * @param productCategories: Partial<ProductCategory>[]
    * @returns Promise<ProductCategory[]>
    */
    async createProductCategories(productCategories: Partial<ProductCategory>[]):Promise<ProductCategory[]>{
        this.logger.log(`createProductCategories: Asociando un cojunto de categorias a un producto`,
            'ProductCategoryService');

        return await this.productCategoryRepository.save(productCategories);
    }

    /**
    * deleteProductCategories
    * @param productCategoryIds: number[]
    * @returns Promise<DeleteResult>
    */
    async deleteProductCategories(productCategoryIds: number[]): Promise<DeleteResult> {
        this.logger.log(`deleteProductCategories: Borrando la asociación entre varias categorias y un producto [productCategoryIds: ${productCategoryIds}]`,
            'ProductCategoryService');

        return await this.productCategoryRepository.delete(productCategoryIds);
    }
}
