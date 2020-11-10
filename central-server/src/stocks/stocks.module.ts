import { Module } from '@nestjs/common';
import { StocksController } from './stocks.controller';

@Module({
  providers: [StocksController],
})
export class StocksModule {}