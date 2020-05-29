import { Controller, Post, Delete, Body } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoriesCreate } from './interfaces/product-categories-create';
import { ProductCategory } from './product-category.entity';
import { ProductCategoriesDelete } from './interfaces/product-categories-delete';
import { DeleteResult } from 'typeorm';

@Controller('product-categories')
export class ProductCategoryController {

    private logger: ILogger;

    constructor(private readonly productCategoryService: ProductCategoryService) {
        this.logger = logger;
    }

    @Post()
    createProductCategories(@Body() productCategoriesCreate: ProductCategoriesCreate): Promise<ProductCategory[]> {
        this.logger.log('createProductCategories: Asociando un cojunto de categorias a un producto',
            'ProductCategoryController');

        return this.productCategoryService.createProductCategories(productCategoriesCreate);
    }

    @Delete()
    deleteProductCategories(@Body() productCategoriesDelete: ProductCategoriesDelete): Promise<DeleteResult> {
        this.logger.log('deleteProductCategories: Borrando la asociación entre varias categorias y un producto',
            'ProductCategoryController');

        return this.productCategoryService.deleteProductCategories(productCategoriesDelete.productCategoriesIds);
    }
}
