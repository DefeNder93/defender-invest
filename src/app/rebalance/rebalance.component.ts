import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-rebalance',
  templateUrl: './rebalance.component.html',
  styleUrls: ['./rebalance.component.scss']
})
export class RebalanceComponent implements OnInit {

  public tickersForm: FormArray = this.fb.array(
    [],
  );

  constructor(private fb: FormBuilder) { }

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

  public rebalance = () => {

  }

  public applyResults = () => {

  }

  public save = () => {

  }

  public reset = () => {

  }

}
