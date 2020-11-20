
import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TdApiService } from '../../services/td-api/td-api.service';
import { ToastManagerService } from '../../services/toast-manager/toast-manager.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EnableGainslockerModalService } from '../../components/modals/enable-gainslock-confirm/enable-gainslock-modal.service';
import { AskCancelOrderModalService } from '../../components/modals/ask-cancel-order/ask-cancel-order-modal.service';
import { CancelOrderOptions } from 'src/app/components/modals/ask-cancel-order/cancel-order.model';
import { AskPlaceTradeModalService } from 'src/app/components/modals/ask-place-trade/ask-place-trade-modal.service';

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
  }]

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
  selector: 'app-trade-bot-page',
  templateUrl: './trade-bot-page.component.html',
  styleUrls: ['./trade-bot-page.component.scss']
})
export class TradeBotPageComponent {

  accountNumber: string;
  currentEquityPositions: any[];
  currentOptionPositions: any[];
  currentCashPositions: any[];

  openSellOrders: any = [];
  openBuyOrders: any = [];

  suggestedBuyOrders: any = []
  suggestedSellOrders: any = []

  @ViewChild('undoToast') undoToast;
  @ViewChild('undoi') undi;

  constructor(private http: HttpClient,
    private tdApiSvc: TdApiService,
    private toastSvc: ToastManagerService,
    private bsModalService: BsModalService,
    private enableGainslockerModalSvc: EnableGainslockerModalService,
    private cancelOrderModalSvc: AskCancelOrderModalService,
    private placeOrderModalSvc: AskPlaceTradeModalService,
  ) { }

  access_token = ''

  title = 'trade-buddy';

  gotTdData = false

  portfolioTotalCash = '-'
  portfolioLongAssetsValue = '-'
  portfolioLongOptionsValue = '-'
  portfolioShortOptionsValue = '-'
  portfolioTotalValue = '-'

  undoClicked(): void {
    console.log('undoing last action...');
  }

  ngOnInit() {
    // this.refreshAccessTokenIfNecessary();

    // this.suggestedBuyOrders.push(fakeBuyOrder1)
    // this.suggestedBuyOrders.push(fakeBuyOrder1)
    // this.suggestedBuyOrders.push(fakeBuyOrder1)
    // this.suggestedSellOrders.push(fakeSellOrder1)

    const minTime = 10200

    setInterval(() => {
      if (this.suggestedBuyOrders.length < 10)
        this.suggestedBuyOrders.push(fakeBuyOrder1)
    }, minTime)

    this.tdApiSvc.positions.subscribe(data => {

      console.log('got positions data: ', data)

      if (data.length > 0) {
        this.gotTdData = true

        this.portfolioTotalCash = '$' + data[0].securitiesAccount.currentBalances.cashAvailableForTrading
        this.portfolioLongAssetsValue = '$' + data[0].securitiesAccount.currentBalances.longMarketValue

        this.portfolioLongOptionsValue = '$' + data[0].securitiesAccount.currentBalances.longOptionMarketValue
        this.portfolioShortOptionsValue = '$' + data[0].securitiesAccount.currentBalances.shortOptionMarketValue
        this.portfolioTotalValue = '$' + data[0].securitiesAccount.currentBalances.liquidationValue

        const sortedPositions = data[0].securitiesAccount.positions.sort((a, b) => +b.marketValue - +a.marketValue)

        // sort by market value
        this.currentCashPositions = sortedPositions.filter(p => p.instrument.symbol.includes('MMDA'))

        const nonCashPositions = sortedPositions.filter(p => !p.instrument.symbol.includes('MMDA'))

        this.currentEquityPositions = nonCashPositions.filter(p => !p.instrument.symbol.includes('_'))

        this.currentOptionPositions = nonCashPositions.filter(p => p.instrument.symbol.includes('_'))

        // ⓘ


      } else {

        console.log('setting cash positions to empty...')

        this.currentOptionPositions = []
        this.currentEquityPositions = []
        this.currentCashPositions = []
      }

    }, err => {
      console.log('err: ', err)
    }, () => {
      console.log('completed getting positions...')
    })

    this.tdApiSvc.orders.subscribe(data => {

      console.log('got orders data', data)

      if (data.length > 0) {
        const currentOrders = data[0].securitiesAccount.orderStrategies || []

        this.openBuyOrders = currentOrders.filter(o => o.orderLegCollection[0].instruction === 'BUY')
        this.openSellOrders = currentOrders.filter(o => o.orderLegCollection[0].instruction === 'SELL')

      }
      else {
        this.openBuyOrders = []
        this.openSellOrders = []
        // this.tdApiSvc.refreshOrders()
      }

    }, err => {
      console.log('err getting orders: ', err)
    }, () => {
      console.log('completed getting orders...')
    })

    console.log('Trade Bot Page Component starting up!')


    this.tdApiSvc.logoutWatcher.subscribe( (loggedOut) => {
      if (loggedOut)
        this.gotTdData = false;
    })

    this.tdApiSvc.refreshData()


  }

  connectWithAccessTokenClick() {

    console.log('trying to connect with: ', this.access_token)

    this.callForPortfolioValues()

  }

  private callForPortfolioValues() {

  }

  private hideFullStringWithAsertisks(input: string): string {

    return input.substr(0, 1) + '*****' + input.substr(input.length - 3, 3)
  }

  dismissTradeSuggestionClick(order, index) {
    console.log('dismissing trade at index ', index, order)

    let tradeSuggestionObject

    if (order.orderLegCollection[0].instruction === 'BUY') {
      tradeSuggestionObject = this.suggestedBuyOrders.splice(index, 1);
    } else {
      tradeSuggestionObject = this.suggestedSellOrders.splice(index, 1);
    }

    tradeSuggestionObject.oldIndex = index;

    console.log('trade Sugg is: ', tradeSuggestionObject)

    // this.

    this.toastSvc.addToast({
      id: Math.floor(Math.random() * 10000),
      type: 'success',
      msg: `Suggestion dismissed!
        "${order.quantity} shares of ${order.orderLegCollection[0].instrument.symbol} at $${order.price}"`,
      timeout: 30000,
      undo: (toast) => {
        this.toastSvc.toasts.push(toast)
      }
    })

  }

  async placeTradeSuggestionClick(order, index) {

    // console.log(`order ${JSON.stringify(order)} trade for`)
    // console.log(`Now, sending a ${order.instruction} trade for ${order.quantity} shared of ${order.symbol}`)

    // // await this.ordersService.placeOrder(order)

    // this.toastSvc.addToast(
    //   {
    //     id: Math.floor(Math.random() * 10000),
    //     type: 'success',
    //     msg: `Bot Trade placed! ${order.quantity} shares of ${order.orderLegCollection[0].instrument.symbol} @ $${order.price} each.`,
    //     timeout: 5000,
    //     undo: (toast) => {

    //       //DOTO - handle undo click

    //       // this.toastSvc.toasts.push(toast)
    //     }
    //   });

    // let tradeSuggestionObject

    // console.log(order.instruction)
    // if (order.orderLegCollection[0].instruction === 'BUY') {

    //   console.log('splicing buys')
    //   tradeSuggestionObject = this.suggestedBuyOrders.splice(index, 1);
    // } else {
    //   tradeSuggestionObject = this.suggestedSellOrders.splice(index, 1);
    // }

    // console.log(tradeSuggestionObject)

    // asdas

    console.log('placing an order: ', order)

    this.placeOrderModalSvc.confirm(order)
      .subscribe((placeOrderModalResponse) => {

        console.log('returned from place order modal: ', placeOrderModalResponse)

        if (placeOrderModalResponse.answer === 'Cancel') {

          console.log('cancelled from the place order popup... do nothing?')
        } else if (placeOrderModalResponse.answer === 'Place Trade!') {
          
          console.log('placing trade! ', placeOrderModalResponse)

        } else {
          console.log('unrecognized answer from place order modal... ', placeOrderModalResponse.answer)
        }

        // if (placeOrderModalResponse.answer.place === placeOrderOptions.place_order) {
        //   console.log(' order!')
        //   this.tdApiSvc.placeOrder(order);
        // }

      });


  }

  async placeTradeSuggestionConfirmed(order, index) {

    // console.log(`order ${JSON.stringify(order)} trade for`)
    // console.log(`Now, sending a ${order.instruction} trade for ${order.quantity} shared of ${order.symbol}`)

    // await this.ordersService.placeOrder(order)

    this.toastSvc.addToast(
      {
        id: Math.floor(Math.random() * 10000),
        type: 'success',
        msg: `Trade placed! ${order.quantity} shares of ${order.orderLegCollection[0].instrument.symbol} @ $${order.price} each.`,
        timeout: 5000,
        undo: (toast) => {

          //DOTO - handle undo click

          // this.toastSvc.toasts.push(toast)
        }
      });

    // TODO - place trade!

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

  enableGainsLockerOnPositionClick(position, index) {
    console.log('enabling gains locker for ', position.instrument.symbol)

    this.enableGainslockerModalSvc.confirm(position)
      .subscribe((enableGainslockModalResponse) => {
        console.log('enableGainslockModalResponse is: ', enableGainslockModalResponse)
        // this.answers.push(answner);
      });
  }

  cancelEnableGainsLockerMode() {
  }

  enableGainsLockerSelectionChange() {
  }

  enableGainsLockerSubmit() {
  }

  cancelOrderClick(order, index) {

    console.log('cancel order clicked: ', order);

    this.cancelOrderModalSvc.confirm(order)
      .subscribe((cancelOrderModalResponse) => {

        console.log('returned from cancel order modal: ', cancelOrderModalResponse)

        if (cancelOrderModalResponse.answer.cancel === CancelOrderOptions.cancel_order) {
          console.log('cancelling order!')
          this.tdApiSvc.cancelOrder(order);
        }

      });

  }

}
