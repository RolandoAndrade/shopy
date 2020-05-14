import { Module } from '@nestjs/common';
import { CategoryTypeService } from './category-type.service';
import { CategoryTypeController } from './category-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryType } from './category-type.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CategoryType])],
  providers: [CategoryTypeService],
  controllers: [CategoryTypeController],
  exports: [CategoryTypeService]
})
export class CategoryTypeModule {}
