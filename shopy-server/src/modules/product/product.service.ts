import { Injectable } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, SelectQueryBuilder, DeleteResult } from 'typeorm';
import { logger } from 'src/logger/loggerConst';
import { ProductParameters } from './interfaces/product-parameters';
import { PaginatedProducts } from './interfaces/paginated-products';
import {DEFAULT_PRODUCT_START_INDEX, MAX_PRODUCTS_BY_PAGE} from "../../constants/products.constants";
import { ProductCategoryService } from '../product-category/product-category.service';
import { ProductCategory } from '../product-category/product-category.entity';
import { ProductImage } from '../product-image/product-image.entity';
import { ProductImageService } from '../product-image/product-image.service';
import { Review } from '../review/review.entity';
import { ReviewService } from '../review/review.service';
import {ProductCreationInterface} from "./interfaces/product-creation-interface";

@Injectable()
export class ProductService {

    private logger: ILogger;

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly productCategoryService: ProductCategoryService,
        private readonly productImageService: ProductImageService,
        private readonly reviewService: ReviewService
    ) {
        this.logger = logger;
    }

    /**
     * createProduct
     * @param product: Partial<Product>
     * @returns Promise<Product>
    */
    async createProduct(product: ProductCreationInterface): Promise<Product> {
        this.logger.log(`createProducts: [product: ${product.product.name}]`,
            'ProductService');

        return await getManager().transaction(async transactionEntityManager => {
            try {
                const productTransactionRepository: Repository<Product> = transactionEntityManager.getRepository(Product);
                this.logger.log(`Creando producto`,'ProductService');
                const p: Product =  await productTransactionRepository.save(product.product);
                const productCategoryTransactionRepository: Repository<ProductCategory> = transactionEntityManager.getRepository(ProductCategory);
                this.logger.log(`Asignando categorías`,'ProductService');
                for (const i of product.categories) {
                    await productCategoryTransactionRepository.save({product: p, category: i})
                }
                return p;
            } catch (error) {
                this.logger.error(error, 'ProductService');
            }
        });
    }

    /**
     * getProducts
     * @param parameters: ProductParameters
     * @returns Promise<PaginatedProducts>
    */
    async getProducts(parameters: ProductParameters): Promise<PaginatedProducts> {
        this.logger.log(`getProducts:  [parameters:${JSON.stringify(parameters)}]`,
            'ProductService');

        parameters.start = parameters.start || DEFAULT_PRODUCT_START_INDEX;
        parameters.limit = parameters.limit || MAX_PRODUCTS_BY_PAGE;

        parameters.start = parameters.start * parameters.limit - parameters.limit;

        let query: SelectQueryBuilder<Product> = this.productRepository
                                                    .createQueryBuilder('product')
                                                    .innerJoinAndSelect('product.productImages', 'images')
                                                    .innerJoin('product.stock', 'stock')
                                                    .innerJoin('product.productCategories', 'productCategories')
                                                    .innerJoin('productCategories.category', 'category')
                                                    .innerJoin('category.categoryType', 'categoryType')
        
        !(parameters.name) || query.andWhere("UPPER(product.name) LIKE :name", { name: `%${parameters.name.toUpperCase()}%` });
        !(parameters.score) || query.andWhere('FLOOR(product.score) = :score', { score: parameters.score });
        !(parameters.new) || query.andWhere('product.new = :new', { new: parameters.new });
        !(parameters.categoryId) || query.andWhere('category.id = :categoryId', { categoryId: parameters.categoryId });
        !(parameters.categoryTypeId) || query.andWhere('categoryType.id = :categoryTypeId', { categoryTypeId: parameters.categoryTypeId });
        query.andWhere('stock.quantity - stock.minimum_quantity > 0');
        
        return {
            products: await query
                .skip(parameters.start)
                .take(parameters.limit)
                .getMany(),
            productsNumber: await query.getCount()
        }
    }

    /**
    * getProductDetail
    * @param productId: number
    * @returns Promise<Product>
    */
    async getProductDetail(productId: number): Promise<Product>{
        this.logger.log(`getProductDetail:  [productId:${productId}]`,
            'ProductService');
        
        return await this.productRepository
                        .createQueryBuilder('product')
                        .innerJoinAndSelect('product.productImages', 'images')
                        .innerJoinAndSelect('product.user', 'user')
                        .innerJoinAndSelect('product.stock', 'stock')
                        .innerJoinAndSelect('product.productCategories', 'productCategories')
                        .innerJoinAndSelect('productCategories.category', 'category')
                        .leftJoinAndSelect('product.reviews', 'reviews')
                        .where('product.id = :id', { id: productId })
                        .getOne()
    }

    /**
     * updateProduct
     * @param product: Product
     * @returns Promise<Product>
    */
    async updateProduct(product: Product): Promise<Product> {
        this.logger.log(`updateProducts: Actualiazdo un producto [productId: ${product.id}]`,
            'ProductService');

        return product
    }

    /**
     * createProductCategories
     * @param productId: number
     * @param productCategories: Partial<ProductCategory>[]
     * @returns Promise<ProductCategory[]>
    */
    async createProductCategories(productId: number, productCategories: Partial<ProductCategory>[]): Promise<ProductCategory[]> {
        this.logger.log(`createProductCategories: Asociando un conjunto de categorias a un producto [productId: ${productId}]`,
            'ProductService');

        const product = await this.productRepository.findOne({ id: productId });
        productCategories.forEach( productCategory => {
            productCategory.product = product;
        });
        
        return await this.productCategoryService.createProductCategories(productCategories);
    }

    /**
     * deleteProductCategory
     * @param productCategoryId: number
     * @returns Promise<DeleteResult>
    */
    async deleteProductCategory(productCategoryId: number): Promise<DeleteResult> {
        this.logger.log(`deleteProductCategory: Borrando la asociación entre una categoria y un producto`,
            'ProductService');

        return await this.productCategoryService.deleteProductCategory(productCategoryId);
    }

    /**
     * createProductImages
     * @param productId: number
     * @param productImages: Partial<ProductImage>[]
     * @returns Promise<ProductImage[]>
    */
    async createProductImages(productId: number, productImages: Partial<ProductImage>[]): Promise<ProductImage[]> {
        this.logger.log(`createProductImages: Asociando un conjunto de imagenes a un producto [productId: ${productId}]`,
            'ProductService');

        const product = await this.productRepository.findOne({ id: productId });
        productImages.forEach(productImage => {
            productImage.product = product;
        });

        return await this.productImageService.createProductImages(productImages);
    } 

    /**
     * deleteProductImage
     * @param productImageId: number
     * @returns Promise<DeleteResult>
    */
    async deleteProductImage(productImageId: number): Promise<DeleteResult> {
        this.logger.log(`deleteProductImage: Borrando una imagen de un producto`,
            'ProductService');

        return await this.productImageService.deleteProductImage(productImageId);
    }

    /**
     * createProductReview
     * @param productId: number
     * @param review: Partial<Review>
     * @returns Promise<Review>
    */
    async createProductReview(productId: number, review: Partial<Review>): Promise<Review> {
        this.logger.log(`createProductReview: Creando el review de un producto [productId: ${productId}]`,
            'ProductService');

        const newReview = await this.reviewService.createProductReview(review);
        let newScore = await this.reviewService.getAverageScoreByProductId(productId);
        const product = await this.productRepository.findOne({ id: productId });
        product.score = newScore;
        //await this.createProduct(product);
        
        return newReview;
    }

    /**
     * deleteProduct
     * @param productId: number
     * @returns Promise<DeleteResult>
    */
/*     async deleteProduct(productId: number): Promise<DeleteResult> {
        this.logger.log(`deleteProduct: Borrando un producto [productId: ${productId}]`,
            'ProductService');

        return await this.productRepository.delete(productId);
    } */
}