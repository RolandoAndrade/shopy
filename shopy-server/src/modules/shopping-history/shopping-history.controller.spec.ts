import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingHistoryController } from './shopping-history.controller';

describe('ShoppingHistory Controller', () => {
  let controller: ShoppingHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingHistoryController],
    }).compile();

    controller = module.get<ShoppingHistoryController>(ShoppingHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
