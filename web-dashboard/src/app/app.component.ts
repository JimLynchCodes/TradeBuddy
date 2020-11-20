import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TdApiService } from './services/td-api/td-api.service';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { StockDataSocketService } from './services/stock-data-socket/stock-data-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  accountNumber: string;

  constructor(private http: HttpClient,
    private tdApiSvc: TdApiService,
    private stockDataSocketSvc: StockDataSocketService) { }

  title = 'trade-buddy';

  defaultNotConnectedToTdText = '[No account connected]'
  maskedConnectedAccountId = this.defaultNotConnectedToTdText;

  access_token = 'ok'

  async ngOnInit() {
    console.log('App Component starting up!')

    this.stockDataSocketSvc.socket.on('connect', function () {
      console.log('app component see that it\'s connected!')

      const symbolsToWatch = ['MSFT', 'GOOG']

      const symbolsCsvString = symbolsToWatch.join(',')

      this.stockDataSocketSvc.socket.emit('set_symbols_to_watch', symbolsCsvString)
    });

  }

  private hideFullStringWithAsertisks(input: string): string {
    return input ? input.substr(0, 1) + '*****' + input.substr(input.length - 3, 3) :
      this.defaultNotConnectedToTdText
  }

  logoutClicked() {
    this.tdApiSvc.logout()
  }

}
