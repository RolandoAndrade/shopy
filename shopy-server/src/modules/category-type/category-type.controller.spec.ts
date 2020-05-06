import { Test, TestingModule } from '@nestjs/testing';
import { CategoryTypeController } from './category-type.controller';

describe('CategoryType Controller', () => {
  let controller: CategoryTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryTypeController],
    }).compile();

    controller = module.get<CategoryTypeController>(CategoryTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
