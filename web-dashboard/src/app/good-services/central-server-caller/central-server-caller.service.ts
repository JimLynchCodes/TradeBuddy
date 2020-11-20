import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerCallerService {

  constructor(private http: HttpClient) { }

  checkSymbol(symbol: string): Promise<any> {
    return new Promise(resolve => {

      // console.log('size is...', Object.keys(this.socketToWatchlistMap).length)

      // if (Object.keys(this.socketToWatchlistMap).length === 0)
      //   return resolve()

      // console.log('calling out for stock data!')

      // const fullStocksList = this.getFullSetOfStocksCsvString()

      console.log('checking symbol: ', symbol)

      // this.http.get(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${this.getFullSetOfStocksCsvString()}` +
      // `&types=quote,news,logo&range=1w&last=10&token=${process.env.IEX_PUBLISHABLE}`)
      // .pipe(map(res => res.data))
      // .subscribe(rawData => {

      // this.http.get('' ) {

      //     console.log('got a response for stock data: ', )

      //   })


      // return new Promise(resolve => {

      const token = 'foo'

      this.http.get(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbol}` +
        `&types=quote,news,logo&range=1w&last=10&token=${token}`)
        .pipe(map((res: any) => res.data))
      // })


      // this.http.post<any>(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbol}`, qs.stringify(body), { headers: tokenHeaders }).subscribe(async response => {
      // console.log('got a response... ', response)
      // this.setTokens(response.access_token, response.expires_in, response.refresh_token, response.refresh_token_expires_in);

      // await this.refreshData()
      // resolve()
      // })

      // this.http.get(getOrdersEndpoint, { headers: ordersHeaders }).subscribe((orders: any) => {

      //   console.log('got orderssss: ', orders)

      //   this.orders.next(orders);
      //   resolve()
      // })
      // })

    })
  }
  
}
