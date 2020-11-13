import { Module } from '@nestjs/common';
import { AppController } from './app.gateway';
import { AppService } from './app.service';
import { StocksSocketGateway } from './stocks/stocks.gateway';
import { StocksModule } from './stocks/stocks.module';
import { IexCloudCallerService } from './iex-cloud-caller/iex-cloud-caller.service';

@Module({
  imports: [StocksModule],
  controllers: [AppController, StocksSocketGateway],
  providers: [AppService, IexCloudCallerService],
})
export class AppModule {}
