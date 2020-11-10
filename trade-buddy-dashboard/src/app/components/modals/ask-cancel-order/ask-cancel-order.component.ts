import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CancelOrderOptions } from './cancel-order.model';

@Component({
  selector: 'app-enable-gainslock-confirm',
  templateUrl: './ask-cancel-order.component.html',
  styleUrls: ['./ask-cancel-order.component.scss']
})
export class AskCancelOrderComponent {
  title: string;
  assetName: string;
  options: string[];
  answer: any = {}

  order: any
  
  constructor(
    public bsModalRef: BsModalRef
  ) { }

  respond(answer: string) {

    this.answer = { cancel: answer}

    if (answer === CancelOrderOptions.cancel_order) {
      console.log('cancelling!! ', answer)
    } else {
      console.log('not cancelling order...')
    }

    this.bsModalRef.hide();
  }

}
