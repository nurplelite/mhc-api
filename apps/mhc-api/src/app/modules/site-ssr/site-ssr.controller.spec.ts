import { Test, TestingModule } from '@nestjs/testing';
import { SiteSsrController } from './site-ssr.controller';
import { SiteSsrService } from './site-ssr.service';

describe('SiteSsrController', () => {
  let controller: SiteSsrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SiteSsrController],
      providers: [SiteSsrService],
    }).compile();

    controller = module.get<SiteSsrController>(SiteSsrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
