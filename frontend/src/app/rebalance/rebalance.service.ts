import { Injectable } from '@angular/core';
import { RebalanceTicker } from '../shared/models/rebalance-ticker.model';

@Injectable({
  providedIn: 'root',
})
export class RebalanceService {
  rebalanceTickers = (rebalanceAmount: number, tickers: RebalanceTicker[]) =>
    tickers
      .map((ticker) => ({
        name: ticker.name,
        additionalAmount: Math.round(
          (rebalanceAmount * ticker.weight) / ticker.currentPrice - ticker.currentAmount,
        ),
        done: false,
      }))
      .filter((e) => e.additionalAmount !== 0);
}
