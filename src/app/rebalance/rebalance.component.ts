import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder} from "@angular/forms";
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

  tickersForm: FormArray = this.fb.array(
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
    private fb: FormBuilder,
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
    const results = this.rebalanceService.rebalanceTickers(this.rebalanceParams?.rebalanceAmount ? this.rebalanceParams.rebalanceAmount : 0, this.tickersForm.value);
    this.rebalanceResults$.next(results);
    this.storageService.saveRebalanceResults(results);
  }

  applyResults = () => {

  }

  reset = () => {
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
    this.storageService.saveRebalanceResults(results)
  }

}
