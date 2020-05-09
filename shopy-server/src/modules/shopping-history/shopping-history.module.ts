import { Module } from '@nestjs/common';
import { ShoppingHistoryService } from './shopping-history.service';
import { ShoppingHistoryController } from './shopping-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingHistory } from './shopping-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingHistory])],
  providers: [ShoppingHistoryService],
  controllers: [ShoppingHistoryController]
})
export class ShoppingHistoryModule {}
