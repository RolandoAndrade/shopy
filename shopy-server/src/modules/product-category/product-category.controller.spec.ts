import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryController } from './product-category.controller';

describe('ProductCategory Controller', () => {
  let controller: ProductCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCategoryController],
    }).compile();

    controller = module.get<ProductCategoryController>(ProductCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
