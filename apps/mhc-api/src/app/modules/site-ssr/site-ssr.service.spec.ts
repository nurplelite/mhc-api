import { Test, TestingModule } from '@nestjs/testing';
import { SiteSsrService } from './site-ssr.service';

describe('SiteSsrService', () => {
  let service: SiteSsrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteSsrService],
    }).compile();

    service = module.get<SiteSsrService>(SiteSsrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
