import { Module } from '@nestjs/common';
import { ShoppingHistoryService } from './shopping-history.service';
import { ShoppingHistoryController } from './shopping-history.controller';

@Module({
  providers: [ShoppingHistoryService],
  controllers: [ShoppingHistoryController]
})
export class ShoppingHistoryModule {}
