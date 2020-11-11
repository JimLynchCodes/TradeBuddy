import { Module } from '@nestjs/common';
import { AppController } from './app.gateway';
import { AppService } from './app.service';
import { StocksSocketGateway } from './stocks/stocks.controller';
import { StocksModule } from './stocks/stocks.module';

@Module({
  imports: [StocksModule],
  controllers: [AppController, StocksSocketGateway],
  providers: [AppService],
})
export class AppModule {}
