import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingHistoryService } from './shopping-history.service';

describe('ShoppingHistoryService', () => {
  let service: ShoppingHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingHistoryService],
    }).compile();

    service = module.get<ShoppingHistoryService>(ShoppingHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
