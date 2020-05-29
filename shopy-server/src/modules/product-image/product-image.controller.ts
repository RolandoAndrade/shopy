import { Controller, Post, Delete, Body } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { ProductImageService } from './product-image.service';
import { ProductImagesCreate } from './interfaces/product-images-create';
import { ProductImage } from './product-image.entity';
import { ProductImagesDelete } from './interfaces/product-images-delete';
import { DeleteResult } from 'typeorm';

@Controller('product-images')
export class ProductImageController {

    private logger: ILogger;

    constructor(private readonly productImageService: ProductImageService) {
        this.logger = logger;
    }

    @Post()
    createProductImages(@Body() productImagesCreate: ProductImagesCreate): Promise<ProductImage[]> {
        this.logger.log('createProductImages: Asociando un conjunto de imagenes a un producto',
            'ProductImageController');

        return this.productImageService.createProductImages(productImagesCreate);
    }

    @Delete()
    deleteProductImages(@Body() productImagesDelete: ProductImagesDelete): Promise<DeleteResult> {
        this.logger.log('deleteProductImages: Borrando un conjunto de imagenes de un producto',
            'ProductImageController');

        return this.productImageService.deleteProductImages(productImagesDelete.productImageIds);
    }
}
