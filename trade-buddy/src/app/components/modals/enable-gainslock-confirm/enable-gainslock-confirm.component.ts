import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-enable-gainslock-confirm',
  templateUrl: './enable-gainslock-confirm.component.html',
  styleUrls: ['./enable-gainslock-confirm.component.scss']
})
export class EnableGainslockConfirmComponent {
  title: string;
  assetName: string;
  sharesOwned: string;
  options: string[];
  answer: string = "";

  gainsLockerPercentageOptions = ['1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%']
  // items = ['1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%']
  
  numberOfsharesToGainslockOptions = ['1', '2', '3']

  numberOfsharesToGainslock = this.numberOfsharesToGainslockOptions[0]
  selectedTriggerPercentage = this.gainsLockerPercentageOptions[0]

  // itemId = this.items[0]
  
  constructor(
    public bsModalRef: BsModalRef,
  ) { }

  respond(answer: string) {
    this.answer = answer;

    console.log('popup answer is: ', answer)

    this.bsModalRef.hide();
  }

}
