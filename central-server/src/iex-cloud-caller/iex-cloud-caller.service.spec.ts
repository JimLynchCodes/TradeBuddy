import { Test, TestingModule } from '@nestjs/testing';
import { IexCloudCallerService } from './iex-cloud-caller.service';

describe('IexCloudCallerService', () => {
  let service: IexCloudCallerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IexCloudCallerService],
    }).compile();

    service = module.get<IexCloudCallerService>(IexCloudCallerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
