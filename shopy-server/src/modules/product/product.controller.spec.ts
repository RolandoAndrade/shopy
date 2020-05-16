import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import {ProductParameters} from "./product-paramters";

describe('Product Controller', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller.getProducts(<ProductParameters>{})).toBeDefined();
  });
});
