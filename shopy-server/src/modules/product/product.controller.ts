import { Controller, Get, Query, Post, Body, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ProductParameters } from './interfaces/product-parameters';
import { PaginatedProducts } from './interfaces/paginated-products';
import { ProductCategory } from '../product-category/product-category.entity';
import { DeleteResult } from 'typeorm';
import { ProductImage } from '../product-image/product-image.entity';
import { Review } from '../review/review.entity';
import {ProductCreationInterface} from "./interfaces/product-creation-interface";
import { ProductImagesDelete } from './interfaces/product-images-delete';
import { ProductCategoriesDelete } from './interfaces/product-categories-delete';

@Controller('products')
export class ProductController {
    private logger: ILogger;

    constructor(private readonly productService: ProductService) {
        this.logger = logger;
    }

    @Post()
    createProduct(@Body() product: ProductCreationInterface): Promise<Product> {
        this.logger.log('createProduct: Creando un producto',
            'ProductController');
        return this.productService.createProduct(product);
    }

    @Get()
    getProducts(@Query() parameters: ProductParameters): Promise<PaginatedProducts> {
        this.logger.log('getProducts: Obteniendo los productos segun un filtrado',
            'ProductController');

        return this.productService.getProducts(parameters);
    }

    @Get(':id')
    getProductDetail(@Param('id', new ParseIntPipe()) productId: number): Promise<Product> {
        this.logger.log('getProducts: Obteniendo el detalle de un producto',
            'ProductController');

        return this.productService.getProductDetail(productId);
    }

    @Put()
    updateProduct(@Body() product: Product): Promise<Product> {
        this.logger.log('updateProduct: Actualizando un producto',
            'ProductController');

        return this.productService.updateProduct(product);
    }

    @Post(':id/product-categories')
    createProductCategories(@Param('id', new ParseIntPipe()) productId: number, @Body() productCategories: Partial<ProductCategory>[]): Promise<ProductCategory[]> {
        this.logger.log('createProductCategories: Asociando un cojunto de categorias a un producto',
            'ProductController');

        return this.productService.createProductCategories(productId, productCategories);
    }

    @Delete(':id/product-categories')
    deleteProductCategories(@Body() productCategoriesDelete: ProductCategoriesDelete): Promise<DeleteResult> {
        this.logger.log('deleteProductCategories: Borrando la asociación entre varias categorias y un producto',
            'ProductController');

        return this.productService.deleteProductCategories(productCategoriesDelete);
    }

    @Post(':id/product-images')
    createProductImages(@Param('id', new ParseIntPipe()) productId: number, @Body() productImages: Partial<ProductImage>[]): Promise<ProductImage[]> {
        this.logger.log('createProductImages: Asociando un conjunto de imagenes a un producto',
            'ProductController');

        return this.productService.createProductImages(productId, productImages);
    }

    @Delete(':id/product-images')
    deleteProductImages(@Body() productImagesDelete: ProductImagesDelete): Promise<DeleteResult> {
        this.logger.log('deleteProductImages: Borrando un conjunto de imagenes de un producto',
            'ProductController');

        return this.productService.deleteProductImages(productImagesDelete);
    }

    @Post(':id/reviews')
    createProductReview(@Param('id', new ParseIntPipe()) productId: number, @Body() review: Partial<Review>): Promise<Review> {
        this.logger.log('createProductReview: Creando el review de un producto',
            'ProductController');

        return this.productService.createProductReview(productId, review);
    }
}
