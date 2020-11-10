import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StocksController } from './stocks/stocks.controller';
import { StocksModule } from './stocks/stocks.module';

@Module({
  imports: [StocksModule],
  controllers: [AppController, StocksController],
  providers: [AppService],
})
export class AppModule {}
