import { Test, TestingModule } from '@nestjs/testing';
import { PaymentStatusController } from './payment-status.controller';

describe('PaymentStatus Controller', () => {
  let controller: PaymentStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentStatusController],
    }).compile();

    controller = module.get<PaymentStatusController>(PaymentStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
