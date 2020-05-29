import { Controller, Get, Query, Post, Body, Param, ParseIntPipe, Put, Delete, UseGuards } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ProductParameters } from './interfaces/product-parameters';
import { PaginatedProducts } from './interfaces/paginated-products';
import { DeleteResult } from 'typeorm';
import { Review } from '../review/review.entity';
import {ProductCreationInterface} from "./interfaces/product-creation-interface";
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductController {
    private logger: ILogger;

    constructor(private readonly productService: ProductService) {
        this.logger = logger;
    }

    @Post()
   // @UseGuards(AuthGuard())
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

    @Put(':id')
    @UseGuards(AuthGuard())
    updateProduct(@Param('id', new ParseIntPipe()) productId: number,@Body() product: Product): Promise<Product> {
        this.logger.log('updateProduct: Actualizando un producto',
            'ProductController');

        return this.productService.updateProduct(product);
    }

    @Post(':id/reviews')
   // @UseGuards(AuthGuard())
    createProductReview(@Param('id', new ParseIntPipe()) productId: number, @Body() review: Partial<Review>): Promise<Review> {
        this.logger.log('createProductReview: Creando el review de un producto',
            'ProductController');

        return this.productService.createProductReview(productId, review);
    }

    @Delete(':id')
   // @UseGuards(AuthGuard())
    deleteProduct(@Param('id', new ParseIntPipe()) productId: number): Promise<DeleteResult> {
        this.logger.log('deleteProduct: Eliminando un producto',
            'ProductController');

        return this.productService.deleteProduct(productId);
    }
}
