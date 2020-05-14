import { Controller, Get, Query, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ProductParameters } from './product-paramters';

@Controller('product')
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
    getProducts(@Query() parameters: ProductParameters): Promise<Product[]> {
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
}
