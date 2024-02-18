import { Injectable } from '@angular/core';
import {
  RebalanceParams,
  RebalanceResult,
  RebalanceTicker,
} from './shared/models/rebalance-ticker.model';
import { PercentCalcParams } from './shared/models/percent-calc.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  saveRebalanceTickers = (tickers: RebalanceTicker[]) => {
    localStorage.setItem('di-rebalance-tickers', JSON.stringify(tickers));
  };

  getRebalanceTickers = (): RebalanceTicker[] => {
    const data = localStorage.getItem('di-rebalance-tickers');
    return (data ? JSON.parse(data) : []) as RebalanceTicker[];
  };

  saveRebalanceParams = (params: RebalanceParams) => {
    localStorage.setItem('di-rebalance-params', JSON.stringify(params));
  };

  getRebalanceParams = (): RebalanceParams | null => {
    const data = localStorage.getItem('di-rebalance-params');
    return data ? (JSON.parse(data) as RebalanceParams) : null;
  };

  saveRebalanceResults = (results: RebalanceResult[]) => {
    localStorage.setItem('di-rebalance-results', JSON.stringify(results));
  };

  getRebalanceResults = (): RebalanceResult[] => {
    const data = localStorage.getItem('di-rebalance-results');
    return (data ? JSON.parse(data) : []) as RebalanceResult[];
  };

  savePercentCalcParams = (params: PercentCalcParams) => {
    localStorage.setItem('di-percent-calc-params', JSON.stringify(params));
  };

  getPercentCalcParams = () => {
    const data = localStorage.getItem('di-percent-calc-params');
    return (data ? JSON.parse(data) : []) as PercentCalcParams;
  };
}
