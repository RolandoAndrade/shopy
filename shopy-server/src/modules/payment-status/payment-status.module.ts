import { Module } from '@nestjs/common';
import { PaymentStatusController } from './payment-status.controller';
import { PaymentStatusService } from './payment-status.service';

@Module({
  controllers: [PaymentStatusController],
  providers: [PaymentStatusService]
})
export class PaymentStatusModule {}
