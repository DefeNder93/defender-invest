import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder} from "@angular/forms";
import {RebalanceService} from "./rebalance.service";
import {RebalanceParams, RebalanceResult, RebalanceResultDone} from "../shared/models/rebalance-ticker.model";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-rebalance',
  templateUrl: './rebalance.component.html',
  styleUrls: ['./rebalance.component.scss']
})
export class RebalanceComponent implements OnInit {

  rebalanceParams: RebalanceParams | null = null;
  rebalanceResults$ = new BehaviorSubject<RebalanceResult[]>([]);

  tickersForm: FormArray = this.fb.array(
    [
      this.fb.group({
        name: 'XLP',
        weight: 0.3,
        currentAmount: 5,
        currentPrice: 400,
      }),
      this.fb.group({
        name: 'XLU',
        weight: 0.4,
        currentAmount: 6,
        currentPrice: 1000,
      })
    ],
  );

  constructor(private fb: FormBuilder, private rebalanceService: RebalanceService) { }

  ngOnInit() {
  }

  addTicker = () => {
    this.tickersForm.push(this.fb.group({
      name: [null],
      weight: [null],
      currentAmount: [null],
      currentPrice: [null],
    }));
  }

  removeTicker = (index: number) => {
    this.tickersForm.removeAt(index);
  }

  rebalance = () => {
    const results = this.rebalanceService.rebalanceTickers(this.rebalanceParams?.rebalanceAmount ? this.rebalanceParams.rebalanceAmount : 0, this.tickersForm.value);
    this.rebalanceResults$.next(results);
  }

  applyResults = () => {

  }

  save = () => {

  }

  reset = () => {

  }

  updateParams = (data: RebalanceParams) => {
    this.rebalanceParams = data;
  }

  toggleDone = (event: RebalanceResultDone) => {
    console.log('event', event);
  }

}
