import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AskPlaceTradeComponent } from './ask-place-trade.component';
// import { EnableTradeConfirmComponent } from './enable-trade-confirm.component';

@Injectable({
    providedIn: 'root'
})
export class AskPlaceTradeModalService {
    bsModalRef: BsModalRef;
    positionSelected: any;
    sharesOwned: any;
    selectedTriggerPercentage: any;

    constructor(
        private bsModalService: BsModalService,
    ) { }

    confirm(position): Observable<any> {

        console.log('opening popup with position: ', position)
        this.positionSelected = position

        const initialState = {
            title: "Place This Trade?",
            assetName: position.orderLegCollection[0].instrument.symbol,
            sharesOwned: position.longQuantity,
            position,
            options: ['Cancel', 'Place Trade!']
        };
        this.bsModalRef = this.bsModalService.show(AskPlaceTradeComponent, { initialState });

        return new Observable<string>(this.getConfirmSubscriber());
    }

    private getConfirmSubscriber() {
        return (observer) => {
            const subscription = this.bsModalService.onHidden.subscribe((reason: any) => {

                console.log('got a reason')

                observer.next({
                    answer: this.bsModalRef.content.answer.answer,
                    assetName: this.positionSelected.orderLegCollection[0].instrument.symbol,
                    numberOfSharesToTrade: this.positionSelected.orderLegCollection[0].longQuantity,
                    position: this.positionSelected,
                    selectedTriggerPercentage: this.bsModalRef.content.answer.selectedTriggerPercentage
                });
                observer.complete();
            });

            return {
                unsubscribe() {
                    subscription.unsubscribe();
                }
            };
        }
    }

}
