import { Module } from '@nestjs/common';
import { StocksSocketGateway } from './stocks.controller';

@Module({
  providers: [StocksSocketGateway],
})
export class StocksModule {}