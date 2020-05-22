import { Module } from '@nestjs/common';
import { ShoppingHistoryService } from './shopping-history.service';
import { ShoppingHistoryController } from './shopping-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingHistory } from './shopping-history.entity';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    CartModule,
    TypeOrmModule.forFeature([ShoppingHistory])
  ],
  providers: [ShoppingHistoryService],
  controllers: [ShoppingHistoryController],
  exports: [ShoppingHistoryService]
})
export class ShoppingHistoryModule {}
