import { Injectable } from '@angular/core';
import {RebalanceTicker} from "../shared/models/rebalance-ticker.model";

@Injectable({
  providedIn: 'root'
})
export class RebalanceService {

  constructor() { }

  rebalanceTicker = (tickers: RebalanceTicker[]) => {
    // TODO
  }
}
