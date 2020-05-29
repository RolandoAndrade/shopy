import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ReviewModule } from '../review/review.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ReviewModule,
    AuthModule,
    TypeOrmModule.forFeature([Product])
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService]
})
export class ProductModule {}
