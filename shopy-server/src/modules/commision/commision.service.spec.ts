import { Test, TestingModule } from '@nestjs/testing';
import { CommisionService } from './commision.service';

describe('CommisionService', () => {
  let service: CommisionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommisionService],
    }).compile();

    service = module.get<CommisionService>(CommisionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
