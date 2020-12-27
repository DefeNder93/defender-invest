import { Injectable } from '@angular/core';
import {RebalanceResult, RebalanceTicker} from "./shared/models/rebalance-ticker.model";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveRebalanceTickers = (tickers: RebalanceTicker[]) => {
    localStorage.setItem('di-rebalance-tickers', JSON.stringify(tickers));
  }

  getRebalanceTickers = (): RebalanceTicker[] => {
    const data = localStorage.getItem('di-rebalance-tickers');
    return (data ? JSON.parse(data) : []) as RebalanceTicker[];
  }

  saveRebalanceResults = (results: RebalanceResult[]) => {
    localStorage.setItem('di-rebalance-results', JSON.stringify(results));
  }

  getRebalanceResults = () => {
    const data = localStorage.getItem('di-rebalance-results');
    return data ? JSON.parse(data) : [];
  }

  savePercentCalcParams = () => {
    // TODO
  }

  getPercentCalcParams = () => {
    // TODO
  }
}
