import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AskPlaceTradeComponent } from './ask-place-trade.component';
// import { EnableTradeConfirmComponent } from './enable-trade-confirm.component';

@Injectable({
    providedIn: 'root'
})
export class AskPlaceTradeService {
    bsModalRef: BsModalRef;
    positionSelected: any;
    numberOfSharesToGainslock: any;
    selectedTriggerPercentage: any;

    constructor(
        private bsModalService: BsModalService,
    ) { }

    confirm(position): Observable<any> {

        this.positionSelected = position

        const initialState = {
            title: "Place This Trade?",
            assetName: position.instrument.symbol,
            sharesOwned: position.longQuantity,
            options: ['Cancel', 'Place Trade!']
        };
        this.bsModalRef = this.bsModalService.show(AskPlaceTradeComponent, { initialState });

        return new Observable<string>(this.getConfirmSubscriber());
    }

    private getConfirmSubscriber() {
        return (observer) => {
            const subscription = this.bsModalService.onHidden.subscribe((reason: any) => {
                observer.next({
                    answer: this.bsModalRef.content.answer.answer,
                    symbolToGainslock: this.positionSelected.instrument.symbol,
                    numberOfSharesToTrade: this.bsModalRef.content.answer.numberOfSharesToTrade,
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
