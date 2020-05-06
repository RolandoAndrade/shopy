import { Test, TestingModule } from '@nestjs/testing';
import { CategoryTypeService } from './category-type.service';

describe('CategoryTypeService', () => {
  let service: CategoryTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryTypeService],
    }).compile();

    service = module.get<CategoryTypeService>(CategoryTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
