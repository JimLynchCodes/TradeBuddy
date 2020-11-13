import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { GainslockerService } from '../../../services/gainslocker/gainslocker.service';

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
  answer: any = {}

  gainsLockerPercentageOptions = ['1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%']
  // items = ['1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%']
  
  numberOfSharesToGainslockOptions = ['1', '2', '3']

  numberOfSharesToGainslock = this.numberOfSharesToGainslockOptions[0]
  selectedTriggerPercentage = this.gainsLockerPercentageOptions[0]

  // itemId = this.items[0]
  
  constructor(
    public bsModalRef: BsModalRef,
    public gainsLockerSvc: GainslockerService,
  ) { }

  respond(answer: string) {

    console.log(this.numberOfSharesToGainslockOptions)
    console.log(this.numberOfSharesToGainslock)

    this.answer = {
      answer,
      numberOfSharesToGainslock: this.numberOfSharesToGainslock,
      selectedTriggerPercentage: this.selectedTriggerPercentage

    }

    console.log('popup answer is: ', this.answer)

    this.gainsLockerSvc.enableGainsLocker(this.assetName, this.numberOfSharesToGainslock, this.selectedTriggerPercentage);

    this.bsModalRef.hide();
  }

}
