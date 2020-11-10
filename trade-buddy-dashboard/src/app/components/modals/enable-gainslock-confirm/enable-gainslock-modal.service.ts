import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EnableGainslockConfirmComponent } from './enable-gainslock-confirm.component';

@Injectable({
    providedIn: 'root'
})
export class EnableGainslockerModalService {
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
            title: "Enable GainsLocker For This Position?",
            assetName: position.instrument.symbol,
            sharesOwned: position.longQuantity,
            options: ['cancel', 'Enable GainsLock!'],
            // answer: "",
        };
        this.bsModalRef = this.bsModalService.show(EnableGainslockConfirmComponent, { initialState });

        return new Observable<string>(this.getConfirmSubscriber());
    }

    private getConfirmSubscriber() {
        return (observer) => {
            const subscription = this.bsModalService.onHidden.subscribe((reason: any) => {
                observer.next({
                    answer: this.bsModalRef.content.answer.answer,
                    symbolToGainslock: this.positionSelected.instrument.symbol,
                    numberOfSharesToGainslock: this.bsModalRef.content.answer.numberOfSharesToGainslock,
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
