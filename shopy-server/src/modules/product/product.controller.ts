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

@Controller('products')
export class ProductController {
    private logger: ILogger;

    constructor(private readonly productService: ProductService) {
        this.logger = logger;
    }

    @Post()
    createProduct(@Body() product: Partial<Product>): Promise<Product> {
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

    @Delete(':productId/product-categories/:id')
    deleteProductCategory(@Param('id', new ParseIntPipe()) productCategoryId: number): Promise<DeleteResult> {
        this.logger.log('deleteProductCategory: Borrando la asociación entre una categoria y un producto',
            'ProductController');

        return this.productService.deleteProductCategory(productCategoryId);
    }

    @Post(':id/product-images')
    createProductImages(@Param('id', new ParseIntPipe()) productId: number, @Body() productImages: Partial<ProductImage>[]): Promise<ProductImage[]> {
        this.logger.log('createProductImages: Asociando un conjunto de imagenes a un producto',
            'ProductController');

        return this.productService.createProductImages(productId, productImages);
    }

    @Delete(':productId/product-images/:id')
    deleteProductImage(@Param('id', new ParseIntPipe()) productImageId: number): Promise<DeleteResult> {
        this.logger.log('deleteProductImage: Borrando una imagen de un producto',
            'ProductController');

        return this.productService.deleteProductImage(productImageId);
    }

    @Post(':id/reviews')
    createProductReview(@Param('id', new ParseIntPipe()) productId: number, @Body() review: Partial<Review>): Promise<Review> {
        this.logger.log('createProductReview: Creando el review de un producto',
            'ProductController');

        return this.productService.createProductReview(productId, review);
    }
}
