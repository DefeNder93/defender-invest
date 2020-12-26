import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RebalanceService {

  constructor() { }

  _rebalance$ = new Subject<number>();
  rebalance$ = this._rebalance$.asObservable();

  rebalance = (rebalanceAmount: number) => this._rebalance$.next(rebalanceAmount);
}
