import { Test, TestingModule } from '@nestjs/testing';
import { StocksSocketGateway } from './stocks.gateway';

describe('StocksSocketGateway', () => {
  let controller: StocksSocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StocksSocketGateway],
    }).compile();

    controller = module.get<StocksSocketGateway>(StocksSocketGateway);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
