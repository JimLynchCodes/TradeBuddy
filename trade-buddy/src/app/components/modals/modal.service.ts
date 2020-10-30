import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EnableGainslockConfirmComponent } from './enable-gainslock-confirm/enable-gainslock-confirm.component';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    bsModalRef: BsModalRef;
    positionSelected: any;
    numberOfsharesToGainslock: any;
    selectedTriggerPercentage: any;

    constructor(
        private bsModalService: BsModalService,
    ) { }

    confirm(position): Observable<string> {

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
            const subscription = this.bsModalService.onHidden.subscribe((reason: string) => {
                observer.next({
                    answer: this.bsModalRef.content.answer,
                    symbolToGainslock: this.positionSelected.instrument.symbol,
                    numberOfsharesToGainslock: this.numberOfsharesToGainslock,
                    selectedTriggerPercentage: this.selectedTriggerPercentage
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
