import { Injectable } from '@angular/core';
import { RebalanceParams, RebalanceTicker } from './shared/models/rebalance-ticker.model';

import { InitialData } from './initial-data.const';

@Injectable({
  providedIn: 'root',
})
export class InitialDataService {
  getRebalanceTickers = (): RebalanceTicker[] => InitialData.rebalanceTickers;

  getRebalanceParams = (): RebalanceParams => InitialData.rebalanceParams;
}
