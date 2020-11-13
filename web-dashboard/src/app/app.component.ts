import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TdApiService } from './services/td-api/td-api.service';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  accountNumber: string;

  constructor(private http: HttpClient, private tdApiSvc: TdApiService) { }

  title = 'trade-buddy';

  defaultNotConnectedToTdText = '[No account connected]'
  maskedConnectedAccountId = this.defaultNotConnectedToTdText;

  access_token = 'ok'

  async ngOnInit() {
    console.log('App Component starting up!')

    var socket = io(environment.tb_central_server_endpoint);

    socket.on('connect', function () {
      console.log('connected!')

      const symbolsToWatch = ['MSFT', 'GOOG']

      const symbolsCsvString = symbolsToWatch.join(',')

      socket.emit('set_symbols_to_watch', symbolsCsvString)
    });

    socket.on('new_data_for_watched_symbols', function (data) {
      console.log('received message!', data)

      let newSymbolsCsvString = ['MSFT']

      const rand = Math.floor(Math.random() * 100)

      if (rand < 25)
        newSymbolsCsvString = ['AAPL']
      else if (rand < 35)
        newSymbolsCsvString = ['TSLA']
      else if (rand < 45)
        newSymbolsCsvString = ['MSFT']
      else if (rand < 55)
        newSymbolsCsvString = ['SHW']
      else if (rand < 65)
        newSymbolsCsvString = ['SNAP']
      else if (rand < 75)
        newSymbolsCsvString = ['BOA']
      else if (rand < 85)
        newSymbolsCsvString = ['V']


      socket.emit('set_symbols_to_watch', newSymbolsCsvString.join(','))

    });
    socket.on('events', function (data) {
      console.log('received message!', data)

    });
    socket.on('disconnect', function () {
      console.log('disconnected from server!')
    });

    // console.log('@# starting up socket!')
    // var socket = io('https://localhost:3002');
    // socket.on('connect', function () {

    //     console.log('@# connected!')

    //     socket.emit('foo', 'bar')

    // });
    // socket.on('events', function (data) { 
    //     console.log('@# received message!', data)

    // });
    // socket.on('disconnect', function () { 
    //     console.log('@# disconnected from server!')
    // });

    // await this.tdApiSvc.init()

    // this.tdApiSvc.positions.subscribe(data => {
    //   this.maskedConnectedAccountId = this.hideFullStringWithAsertisks(data[0]?.securitiesAccount.accountId)
    // })

  }

  private hideFullStringWithAsertisks(input: string): string {
    return input ? input.substr(0, 1) + '*****' + input.substr(input.length - 3, 3) :
      this.defaultNotConnectedToTdText
  }

  logoutClicked() {
    this.tdApiSvc.logout()
  }

}
