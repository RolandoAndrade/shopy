import { Module } from '@nestjs/common';
import { PaymentStatusController } from './payment-status.controller';
import { PaymentStatusService } from './payment-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentStatus } from './payment-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentStatus])],
  controllers: [PaymentStatusController],
  providers: [PaymentStatusService]
})
export class PaymentStatusModule {}
