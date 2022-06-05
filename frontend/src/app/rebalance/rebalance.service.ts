import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {RebalanceTicker} from "../shared/models/rebalance-ticker.model";

@Injectable({
  providedIn: 'root'
})
export class RebalanceService {

  constructor() { }

  // _rebalance$ = new Subject<number>();
  // rebalance$ = this._rebalance$.asObservable();
  //
  // rebalance = (rebalanceAmount: number) => this._rebalance$.next(rebalanceAmount);

  rebalanceTickers = (rebalanceAmount: number, tickers: RebalanceTicker[]) =>
    tickers.map((ticker) => ({
      name: ticker.name,
      additionalAmount: Math.round(rebalanceAmount * ticker.weight / ticker.currentPrice - ticker.currentAmount),
      done: false
    })).filter((e) => e.additionalAmount !== 0);
}
