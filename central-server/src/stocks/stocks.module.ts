import { Module } from '@nestjs/common';
import { StocksSocketGateway } from './stocks.gateway';

@Module({
  providers: [StocksSocketGateway],
})
export class StocksModule {}