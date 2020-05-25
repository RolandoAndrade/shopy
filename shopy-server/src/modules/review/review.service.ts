import { Injectable } from '@nestjs/common';
import { Review } from './review.entity';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {

    private logger: ILogger;

    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
    ) {
        this.logger = logger;
    }

    /**
    * createProductReview
    * @param review: Partial<Review>
    * @returns Promise<Review>
    */
    async createProductReview(review: Partial<Review>): Promise<Review> {
        this.logger.log(`createProductReview: Creando el review de un producto`,
            'ProductImageService');

        return await this.reviewRepository.save(review);
    }

    /**
    * getAverageScoreByProductId
    * @param productId: number
    * @returns Promise<number>
    */
    async getAverageScoreByProductId(productId: number): Promise<number> {
        this.logger.log(`getAverageScoreByProductId: Obteniendo el promedio de puntuación de un producto [productId: ${productId}]`,
            'ProductImageService');

        const { avgScore } = await this.reviewRepository.createQueryBuilder('review')
                                                        .select("AVG(review.score)", "avgScore")
                                                        .where("review.fk_product_id = :productId", { productId: productId })
                                                        .getRawOne();
        return avgScore;
    }

}
