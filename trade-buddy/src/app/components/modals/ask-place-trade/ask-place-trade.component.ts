import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/';
import { AskPlaceTradeModalService } from './ask-place-trade-modal.service';

@Component({
  selector: 'app-ask-place-trade',
  templateUrl: './ask-place-trade.component.html',
  styleUrls: ['./ask-place-trade.component.scss']
})
export class AskPlaceTradeComponent implements OnInit {

  ngOnInit(): void {
  }

  title: string;
  // assetName: string;
  // sharesOwned: string;
  options: string[];
  answer: any = {}

  position: any = {}

  tradePercentageOptions = ['1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%']
  items = ['1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%']
  
  numberOfSharesToTradeOptions = ['1', '2', '3']

  numberOfSharesToTrade = this.numberOfSharesToTradeOptions[0]
  selectedTriggerPercentage = this.tradePercentageOptions[0]

  // itemId = this.items[0]
  
  constructor(
    public bsModalRef: BsModalRef,
    public gainsLockerSvc: AskPlaceTradeModalService,
  ) { }

  respond(answer: any) {

    console.log('responding?')

    console.log(this.numberOfSharesToTradeOptions)
    console.log(this.numberOfSharesToTrade)

    this.answer = {
      answer,
      numberOfSharesToTrade: this.numberOfSharesToTrade,
      selectedTriggerPercentage: this.selectedTriggerPercentage

    }

    console.log('popup answer is: ', this.answer)

    // this.gainsLockerSvc.enableGainsLocker(this.assetName, this.numberOfSharesToTrade, this.selectedTriggerPercentage);

    this.bsModalRef.hide();
  }

}

