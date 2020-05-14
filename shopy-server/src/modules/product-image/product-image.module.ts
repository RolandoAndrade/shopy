import { Module } from '@nestjs/common';
import { ProductImageController } from './product-image.controller';
import { ProductImageService } from './product-image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './product-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage])],
  controllers: [ProductImageController],
  providers: [ProductImageService]
})
export class ProductImageModule {}
