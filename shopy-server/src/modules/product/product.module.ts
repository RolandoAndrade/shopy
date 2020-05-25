import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductCategoryModule } from '../product-category/product-category.module';
import { ProductImageModule } from '../product-image/product-image.module';
import { ReviewModule } from '../review/review.module';

@Module({
  imports: [
    ProductCategoryModule,
    ProductImageModule,
    ReviewModule,
    TypeOrmModule.forFeature([Product])
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
