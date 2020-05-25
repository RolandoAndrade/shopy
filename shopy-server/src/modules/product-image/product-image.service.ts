import { Injectable } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { ProductImage } from './product-image.entity';

@Injectable()
export class ProductImageService {

    private logger: ILogger;

    constructor(
        @InjectRepository(ProductImage)
        private readonly productImageRepository: Repository<ProductImage>,
    ) {
        this.logger = logger;
    }

    /**
    * createProductImages
    * @param productImages: Partial<ProductImage>[]
    * @returns Promise<ProductImage[]>
    */
    async createProductImages(productImages: Partial<ProductImage>[]): Promise<ProductImage[]> {
        this.logger.log(`createProductImages: Asociando un conjunto de imagenes a un producto`,
            'ProductImageService');

        return await this.productImageRepository.save(productImages);
    }

    /**
    * deleteProductImage
    * @param productImageId: number
    * @returns Promise<DeleteResult>
    */
    async deleteProductImage(productImageId: number): Promise<DeleteResult> {
        this.logger.log(`deleteProductImage: Borrando una imagen de un producto [productImageId: ${productImageId}`,
            'ProductImageService');

        return await this.productImageRepository.delete(productImageId);
    }
}
