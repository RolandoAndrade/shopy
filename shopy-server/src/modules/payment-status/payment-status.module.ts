import { Module } from '@nestjs/common';
import { PaymentStatusController } from './payment-status.controller';
import { PaymentStatusService } from './payment-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentStatus } from './payment-status.entity';
import { StatusModule } from '../status/status.module';

@Module({
  imports: [
    StatusModule,
    TypeOrmModule.forFeature([PaymentStatus])
  ],
  controllers: [PaymentStatusController],
  providers: [PaymentStatusService],
  exports: [PaymentStatusService]
})
export class PaymentStatusModule {}
