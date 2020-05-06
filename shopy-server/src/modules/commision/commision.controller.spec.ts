import { Test, TestingModule } from '@nestjs/testing';
import { CommisionController } from './commision.controller';

describe('Commision Controller', () => {
  let controller: CommisionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommisionController],
    }).compile();

    controller = module.get<CommisionController>(CommisionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
