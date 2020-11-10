import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GainslockerService {

  constructor() { }

  enableGainsLocker(assetName: any, numberOfSharesToGainslock: any, selectedTriggerPercentage: any) {
    console.log(`enabling gainslocker for ${numberOfSharesToGainslock} shares of ${assetName} at trigger price: ${selectedTriggerPercentage}`)
  }
}
