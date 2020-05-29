import { Injectable } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { ProductImage } from './product-image.entity';
import { ProductImagesCreate } from './interfaces/product-images-create';

@Injectable()
export class ProductImageService {

    private logger: ILogger;

    constructor(
        @InjectRepository(ProductImage)
        private readonly productImageRepository: Repository<ProductImage>
    ) {
        this.logger = logger;
    }

    /**
    * createProductImages
    * @param productImagesCreate: ProductImagesCreate
    * @returns Promise<ProductImage[]>
    */
    async createProductImages(productImagesCreate: ProductImagesCreate): Promise<ProductImage[]> {
        this.logger.log(`createProductImages: Asociando un conjunto de imagenes a un producto`,
            'ProductImageService');

        return await this.productImageRepository.save(productImagesCreate.productImages);
    }

    /**
    * deleteProductImages
    * @param productImageIds: number
    * @returns Promise<DeleteResult>
    */
    async deleteProductImages(productImageIds: number[]): Promise<DeleteResult> {
        this.logger.log(`deleteProductImages: Borrando un conjunto de imagenes de un producto [productImageIds: ${productImageIds}`,
            'ProductImageService');

        return await this.productImageRepository.delete(productImageIds);
    }
}
