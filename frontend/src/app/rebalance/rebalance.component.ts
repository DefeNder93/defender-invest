import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UntypedFormArray, UntypedFormBuilder} from "@angular/forms";
import {RebalanceService} from "./rebalance.service";
import {RebalanceParams, RebalanceResult, RebalanceResultDone} from "../shared/models/rebalance-ticker.model";
import {BehaviorSubject} from "rxjs";
import {StorageService} from "../storage.service";

@Component({
  selector: 'app-rebalance',
  templateUrl: './rebalance.component.html',
  styleUrls: ['./rebalance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RebalanceComponent implements OnInit {

  rebalanceParams: RebalanceParams | null = this.storageService.getRebalanceParams();
  rebalanceResults$ = new BehaviorSubject<RebalanceResult[]>(this.storageService.getRebalanceResults());
  rebalanceAmount$ = new BehaviorSubject<number | null>(null);

  tickersForm: UntypedFormArray = this.fb.array(
    this.getTickersForm()
    //[
      // this.fb.group({
      //   name: 'XLP',
      //   weight: 0.3,
      //   currentAmount: 5,
      //   currentPrice: 400,
      // }),
      // this.fb.group({
      //   name: 'XLU',
      //   weight: 0.4,
      //   currentAmount: 6,
      //   currentPrice: 1000,
      // })
    //],
  );

  constructor(
    private fb: UntypedFormBuilder,
    private rebalanceService: RebalanceService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
  }

  addTicker = () => {
    this.tickersForm.push(this.fb.group({
      name: [null],
      weight: [null],
      currentAmount: [null],
      currentPrice: [null],
      comparisonPrice: [null],
    }));
    this.storageService.saveRebalanceTickers(this.tickersForm.value);
  }

  removeTicker = (index: number) => {
    this.tickersForm.removeAt(index);
    this.storageService.saveRebalanceTickers(this.tickersForm.value);
  }

  changeTicker = () => {
    this.storageService.saveRebalanceTickers(this.tickersForm.value);
  }

  getTickersForm() {
    const tickers = this.storageService.getRebalanceTickers();
    return tickers.map((e) => this.fb.group(e));
  }

  rebalance = () => {
    const rebalanceAmount = this.rebalanceParams?.rebalanceAmount ? this.rebalanceParams.rebalanceAmount : 0;
    const results = this.rebalanceService.rebalanceTickers(rebalanceAmount, this.tickersForm.value);
    results.length === 0 && alert('There is nothing to rebalance');
    this.rebalanceResults$.next(results);
    this.storageService.saveRebalanceResults(results);
  }

  recalculateRebalanceAmount = () => {
    let amountSum = 0;
    let weightSum = 0;
    this.tickersForm.controls.forEach((control) => {
      if (control.value.currentAmount > 0) {
        amountSum += Math.abs(control.value.currentAmount) * control.value.comparisonPrice;
      } else {
        // TODO complete
        amountSum += Math.abs(control.value.currentAmount) * control.value.currentPrice - Math.abs(control.value.currentAmount) * (control.value.comparisonPrice - control.value.currentPrice);
      }
      weightSum += Math.abs(control.value.weight);
    });
    this.rebalanceAmount$.next(Math.round(amountSum/weightSum));
  }

  applyComparisonPrices = () => {
    this.tickersForm.controls.forEach((control) => {
      control.patchValue({currentPrice: control.value.comparisonPrice})
      control.patchValue({comparisonPrice: null})
    });
  }

  applyResults = () => {
    this.rebalanceResults$.getValue().forEach((result) => {
      const tickerForm = this.tickersForm.controls.find((e) => e.value.name === result.name);
      tickerForm && (tickerForm.patchValue({currentAmount: tickerForm.value.currentAmount + result.additionalAmount}))
    });
    this.storageService.saveRebalanceTickers(this.tickersForm.value);
    this.resetResults();
  }

  resetResults = () => {
    this.rebalanceResults$.next([]);
    this.storageService.saveRebalanceResults([]);
  }

  updateParams = (data: RebalanceParams) => {
    this.rebalanceParams = data;
    this.storageService.saveRebalanceParams(data);
  }

  toggleDone = (event: RebalanceResultDone) => {
    const results = this.rebalanceResults$.getValue();
    const result = results.find((e) => e.name === event.name);
    result && (result.done = event.done);
    this.rebalanceResults$.next(results);
    this.storageService.saveRebalanceResults(results);
  }

  removeTask = (event: any) => {
    const results = this.rebalanceResults$.getValue().filter((e) => e.name !== event.name);
    this.rebalanceResults$.next(results);
    this.storageService.saveRebalanceResults(results);
    return results;
  }

}
