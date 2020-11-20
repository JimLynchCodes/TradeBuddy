import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockDataSocketService {

  socket = io(environment.tb_central_server_endpoint);

  connectionSuccess = new BehaviorSubject(null)
  dataForSymbols = new BehaviorSubject(null)
  currentSymbolsToWatch = ''

  constructor() {
    this.setupConnectionListeners()
    this.setupDisconnectListener()
    this.setupNewStockDataListener()
    this.setupCheckSymbolResponseListener()
  }

  private setupConnectionListeners() {
    this.socket.on('connect', function () {
      console.log('connected to server!')
    });
  }

  private setupDisconnectListener() {
    this.socket.on('disconnect', function () {
      console.log('disconnected from server!')
    });
  }

  private setupCheckSymbolResponseListener() {
    this.socket.on('check_symbol_response', function (data) {

      console.log('received check symbol response!', data)
    });
  }

  private setupNewStockDataListener() {
    this.socket.on('new_data_for_watched_symbols', function (data) {
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

      this.socket.emit('set_symbols_to_watch', newSymbolsCsvString.join(','))

    });
  }

}
