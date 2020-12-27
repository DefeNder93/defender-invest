import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";
import {Subject} from "rxjs";
import {RebalanceResult} from "../../shared/models/rebalance-ticker.model";

@Component({
  selector: 'app-rebalance-ticker',
  templateUrl: './rebalance-ticker.component.html',
  styleUrls: ['./rebalance-ticker.component.scss']
})
export class RebalanceTickerComponent implements OnInit, OnDestroy {

  @Input() form: AbstractControl = new FormGroup({});
  @Input() index: number = 0;
  @Input() results: RebalanceResult[] | null = [];

  @Output() removeTicker = new EventEmitter();

  private onDestroy$: Subject<void> = new Subject();

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  getFb = () => this.form as FormGroup;

  getAdditionalAmount = () => this.results ? this.results.find((e) => e.name === this.form.value.name)?.additionalAmount : 0;

}
