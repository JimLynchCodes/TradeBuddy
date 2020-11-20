import { HttpService, Injectable } from '@nestjs/common';
import { response } from 'express';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class IexCloudCallerService {

  constructor(private readonly http: HttpService) { }

  stockData = new BehaviorSubject(undefined)

  // quotes = new BehaviorSubject(undefined)

  // news = new BehaviorSubject(undefined)

  socketToWatchlistMap = {}

  // globalStocksWatchlist = new Set()

  checkSymbol(symbol: string): Promise<any> {
    return new Promise(resolve => {

      console.log('size is...', Object.keys(this.socketToWatchlistMap).length)

      if (Object.keys(this.socketToWatchlistMap).length === 0)
        return resolve()

      console.log('calling out for stock data!')

      const fullStocksList = this.getFullSetOfStocksCsvString()

      console.log('fullStocksList: ', fullStocksList)
      console.log('socketToWatchlistMap: ', this.socketToWatchlistMap)

      this.http.get(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${this.getFullSetOfStocksCsvString()}` +
        `&types=quote,news,logo&range=1w&last=10&token=${process.env.IEX_PUBLISHABLE}`)
        .pipe(map(res => res.data))
        .subscribe(rawData => {

          console.log('got a response for stock data: ', rawData)

        })
      })
  }

  getStockData() {

    const randomNum = Math.random() * 10_000

    return new Promise(resolve => {

      console.log('size is...', Object.keys(this.socketToWatchlistMap).length)

      if (Object.keys(this.socketToWatchlistMap).length === 0)
        return resolve()

      console.log('calling out for stock data!')

      const fullStocksList = this.getFullSetOfStocksCsvString()

      console.log('fullStocksList: ', fullStocksList)
      console.log('socketToWatchlistMap: ', this.socketToWatchlistMap)

      this.http.get(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${this.getFullSetOfStocksCsvString()}` +
        `&types=quote,news,logo&range=1w&last=10&token=${process.env.IEX_PUBLISHABLE}`)
        .pipe(map(res => res.data))
        .subscribe(rawData => {

          console.log('got a response!', rawData)

          // const quotesOnly = Object.keys(rawData).reduce((acc, curr) => {
          //   acc[curr] = rawData[curr].quote
          //   return acc
          // }, {})

          // const newsOnly = Object.keys(rawData).reduce((acc, curr) => {
          //   acc[curr] = rawData[curr].news
          //   return acc
          // }, {})

          this.stockData.next(rawData)
          // this.quotes.next(quotesOnly)
          // this.news.next(newsOnly)

          resolve()
        })

    })

    // return Promise.resolve('foo' + randomNum)
  }

  private getFullSetOfStocksCsvString() {

    const symbolsSet: Set<string> = Object.values(this.socketToWatchlistMap).reduce<Set<string>>((acc: Set<string>, curr: string[]) => {

      curr.forEach(symbol => acc.add(symbol))

      return acc

    }, new Set())

    return [...symbolsSet].join(',')
  }

  addSymbolsToCentralWatchlist(socketId: string, symbolsToWatchScvString: string) {

    this.socketToWatchlistMap[socketId] = symbolsToWatchScvString.split(',');

    // const symbols: string[] = 

    // symbols.forEach(symbol => this.globalStocksWatchlist.add(symbol))
  }

}
