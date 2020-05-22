import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockModule } from '../stock/stock.module';

@Module({
  imports: [
    StockModule,
    TypeOrmModule.forFeature([Cart])
  ],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService]
})
export class CartModule {}
