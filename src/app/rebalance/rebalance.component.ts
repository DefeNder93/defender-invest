import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder} from "@angular/forms";
import {RebalanceService} from "./rebalance.service";
import {RebalanceParams} from "../shared/models/rebalance-ticker.model";

@Component({
  selector: 'app-rebalance',
  templateUrl: './rebalance.component.html',
  styleUrls: ['./rebalance.component.scss']
})
export class RebalanceComponent implements OnInit {

  public rebalanceParams: RebalanceParams | null = null;

  public tickersForm: FormArray = this.fb.array(
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

  public ngOnInit() {
  }

  public addTicker = () => {
    this.tickersForm.push(this.fb.group({
      name: [null],
      weight: [null],
      currentAmount: [null],
      currentPrice: [null],
    }));
  }

  public removeTicker = (index: number) => {
    this.tickersForm.removeAt(index);
  }

  public rebalance = () => this.rebalanceService.rebalance(this.rebalanceParams?.rebalanceAmount ? this.rebalanceParams.rebalanceAmount : 0);

  public applyResults = () => {

  }

  public save = () => {

  }

  public reset = () => {

  }

  public updateParams = (data: RebalanceParams) => {
    this.rebalanceParams = data;
  }

}
