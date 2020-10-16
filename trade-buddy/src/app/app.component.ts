import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const fakeBuyOrder1 = {
  quantity: 1,
  price: 2,
  orderLegCollection: [{
    instruction: 'BUY',
    instrument: {
      symbol: 'MSFT'
    }
  }],
  reasons: [{
    text: 'spike up in volume',
  },
  {
    text: 'just picked up a great new CTO'
  },
  {
    text: 'price has been steadily climbing'
  },
  {
    text: 'triple gainers list 10/14/2020 with 80% buy recc'
  }
]

}

const fakeSellOrder1 = {
  quantity: 1,
  price: 1000,
  orderLegCollection: [{
    instruction: 'SELL',
    instrument: {
      symbol: 'TSLA'
    }
  }]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  accountNumber: string;
  currentPositions: any[];
  currentOrders: any;

  suggestedBuyOrders:any = []
  suggestedSellOrders:any = []

  constructor(private http: HttpClient) { }

  title = 'trade-buddy';
  connectedToText = '[No account connected]';

  access_token = 'ok'

  currentCash = '$10,234'

  portfolioTotalCash = '-'
  portfolioLongAssetsValue = '-'
  portfolioLongOptionsValue = '-'
  portfolioShortOptionsValue = '-'
  portfolioTotalValue = '-'

  ngOnInit() {
    console.log('init app');

    this.suggestedBuyOrders.push(fakeBuyOrder1)
    this.suggestedBuyOrders.push(fakeBuyOrder1)
    this.suggestedBuyOrders.push(fakeBuyOrder1)
    this.suggestedSellOrders.push(fakeSellOrder1)
    
    
    // const minTime = 3200
    
    // setInterval(() => {
    //   this.suggestedBuyOrders.push(fakeBuyOrder1)
    // }, minTime)

  }

  connectWithAccessTokenClick() {

    console.log('trying to connect with: ', this.access_token)

    this.callForPortfolioValues()

  }

  private callForPortfolioValues() {

    const positionEndpoint = 'https://api.tdameritrade.com/v1/accounts?fields=positions'
    const ordersEndpoint = 'https://api.tdameritrade.com/v1/accounts?fields=orders'

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.access_token}`
    })

    this.http.get(positionEndpoint, { headers: headers }).subscribe(data => {

      console.log('got positions data', data)

      this.connectedToText = this.hideFullStringWithAsertisks(data[0].securitiesAccount.accountId)

      this.portfolioTotalCash = '$' + data[0].securitiesAccount.currentBalances.cashAvailableForTrading
      this.portfolioLongAssetsValue = '$' + data[0].securitiesAccount.currentBalances.longMarketValue

      this.portfolioLongOptionsValue = '$' + data[0].securitiesAccount.currentBalances.longOptionMarketValue
      this.portfolioShortOptionsValue = '$' + data[0].securitiesAccount.currentBalances.shortOptionMarketValue
      this.portfolioTotalValue = '$' + data[0].securitiesAccount.currentBalances.liquidationValue

      // sort by market value
      this.currentPositions = data[0].securitiesAccount.positions.sort((a, b) => +b.marketValue - +a.marketValue)

    }, err => {
      console.log('err: ', err)
    }, () => {
      console.log('completed: ')
    })

    this.http.get(ordersEndpoint, { headers: headers }).subscribe(data => {

      console.log('got orders data', data)

      this.currentOrders = data[0].securitiesAccount.orderStrategies

    }, err => {
      console.log('err: ', err)
    }, () => {
      console.log('completed: ')
    })

  }

  private hideFullStringWithAsertisks(input: string): string {

    return input.substr(0, 1) + '*****' + input.substr(input.length - 3, 3)
  }

}
