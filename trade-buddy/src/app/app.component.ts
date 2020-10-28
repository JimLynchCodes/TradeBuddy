import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { TdApiService } from './td-api.service';

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

const fakeBuyOrder2 = {
  quantity: 2,
  price: 3.45,
  orderLegCollection: [{
    instruction: 'BUY',
    instrument: {
      symbol: 'AAPL'
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

const fakeBuyOrder3 = {
  quantity: 1,
  price: 265.23,
  orderLegCollection: [{
    instruction: 'BUY',
    instrument: {
      symbol: 'TSLA'
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

  suggestedBuyOrders: any = [fakeBuyOrder2, fakeBuyOrder3]
  suggestedSellOrders: any = []

  @ViewChild('undoToast') undoToast;
  @ViewChild('undoi') undi;

  constructor(private http: HttpClient, private tdApiSvc: TdApiService) { }

  title = 'trade-buddy';
  connectedToText = '[No account connected]';

  access_token = 'ok'

  currentCash = '$10,234'

  portfolioTotalCash = '-'
  portfolioLongAssetsValue = '-'
  portfolioLongOptionsValue = '-'
  portfolioShortOptionsValue = '-'
  portfolioTotalValue = '-'

  toasts: any = [{
    type: 'success',
    msg: `Foo Trade placed! 10 shares of MSFT @ $15.04 each.`,
    timeout: 5000
  }]

  undoClicked(): void { }

  ngOnInit() {
    console.log('init app');

    this.suggestedBuyOrders.push(fakeBuyOrder1)
    this.suggestedBuyOrders.push(fakeBuyOrder1)
    this.suggestedBuyOrders.push(fakeBuyOrder1)
    this.suggestedSellOrders.push(fakeSellOrder1)

    const minTime = 10200

    setInterval(() => {
      if (this.suggestedBuyOrders.length < 10)
        this.suggestedBuyOrders.push(fakeBuyOrder1)
    }, minTime)

    setInterval(() => {
      if (this.suggestedBuyOrders.length < 10)
        this.toasts.push({
          type: 'success',
          msg: `Trade placed! ${1} shares of BLAH each.`,
          dismissible: true,
          timeout: 5000,
        })
    }, 5000)

  }

  ngAfterViewInit() { }

  connectWithAccessTokenClick() {

    console.log('trying to connect with: ', this.access_token)

    // this.callForPortfolioValues()

  }

  // private callForPortfolioValues() {

    
  //   // const ordersEndpoint = 'https://api.tdameritrade.com/v1/accounts?fields=orders'

  //   this.tdApiSvc.positions.subscribe(data => {

  //   // this.http.get(positionEndpoint, { headers: headers }).subscribe(

  //     console.log('got positions data', data)

  //     this.connectedToText = this.hideFullStringWithAsertisks(data[0].securitiesAccount.accountId)

  //     this.portfolioTotalCash = '$' + data[0].securitiesAccount.currentBalances.cashAvailableForTrading
  //     this.portfolioLongAssetsValue = '$' + data[0].securitiesAccount.currentBalances.longMarketValue

  //     this.portfolioLongOptionsValue = '$' + data[0].securitiesAccount.currentBalances.longOptionMarketValue
  //     this.portfolioShortOptionsValue = '$' + data[0].securitiesAccount.currentBalances.shortOptionMarketValue
  //     this.portfolioTotalValue = '$' + data[0].securitiesAccount.currentBalances.liquidationValue

  //     // sort by market value
  //     this.currentPositions = data[0].securitiesAccount.positions.sort((a, b) => +b.marketValue - +a.marketValue)

  //   }, err => {
  //     console.log('err: ', err)
  //   }, () => {
  //     console.log('completed: ')
  //   })

  //   // this.http.get(ordersEndpoint, { headers: headers }).subscribe(data => {

  //   //   console.log('got orders data', data)

  //   //   this.currentOrders = data[0].securitiesAccount.orderStrategies

  //   // }, err => {
  //   //   console.log('err: ', err)
  //   // }, () => {
  //   //   console.log('completed: ')
  //   // })

  //   this.tdApiSvc.refreshPositions()

  // }

  private hideFullStringWithAsertisks(input: string): string {

    return input.substr(0, 1) + '*****' + input.substr(input.length - 3, 3)
  }

  dismissTradeSuggestionClick(order, index) {
    console.log('dismissing trade at index ', index)

    let tradeSuggestionObject
    
    if (order.orderLegCollection[0].instruction === 'BUY') {
      tradeSuggestionObject = this.suggestedBuyOrders.splice(index, 1);
    } else {
      tradeSuggestionObject = this.suggestedSellOrders.splice(index, 1);
    }
    
    console.log('trade Sugg is: ', tradeSuggestionObject)
  }
  
  onClosed(dismissedAlert: AlertComponent): void {
    console.log('closed: ', dismissedAlert)
  }

  placeTradeSuggestionClick(order, index) {
    
    console.log(order)

    console.log(`sending a ${order.instruction} trade for ${order.quantity} shared of ${order.symbol}`)

    this.toasts.push({
      type: 'success',
      msg: `Trade placed! ${1} shares of BLAH each.`,
      dismissible: true,
      timeout: 5000,
    })

    let tradeSuggestionObject
    
    console.log(order.instruction)
    if (order.orderLegCollection[0].instruction === 'BUY') {

      console.log('splicing buys')
      tradeSuggestionObject = this.suggestedBuyOrders.splice(index, 1);
    } else {
      tradeSuggestionObject = this.suggestedSellOrders.splice(index, 1);
    }

    console.log(tradeSuggestionObject)

  }

}
