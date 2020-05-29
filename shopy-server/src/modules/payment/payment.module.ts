import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { ConfigModule } from 'src/config/config.module';
import { CartModule } from '../cart/cart.module';
import { UserModule } from '../user/user.module';
import { CommisionModule } from '../commission/commission.module';
import { StatusModule } from '../status/status.module';
import { PaymentStatusModule } from '../payment-status/payment-status.module';
import { ShoppingHistoryModule } from '../shopping-history/shopping-history.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    CartModule,
    UserModule,
    CommisionModule,
    StatusModule,
    PaymentStatusModule,
    ShoppingHistoryModule,
    AuthModule,
    TypeOrmModule.forFeature([Payment])
  ],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}
