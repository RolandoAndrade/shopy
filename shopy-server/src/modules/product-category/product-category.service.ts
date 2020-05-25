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
    * deleteProductCategory
    * @param productCategoryId: number
    * @returns Promise<DeleteResult>
    */
    async deleteProductCategory(productCategoryId: number): Promise<DeleteResult> {
        this.logger.log(`deleteProductCategory: Borrando la asociación entre una categoria y un producto [productCategoryId: ${productCategoryId}]`,
            'ProductCategoryService');

        return await this.productCategoryRepository.delete(productCategoryId);
    }
}
