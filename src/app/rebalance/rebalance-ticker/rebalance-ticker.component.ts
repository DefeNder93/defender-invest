import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";
import {Subject} from "rxjs";
import {RebalanceResult} from "../../shared/models/rebalance-ticker.model";
import {debounceTime, distinctUntilChanged, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-rebalance-ticker',
  templateUrl: './rebalance-ticker.component.html',
  styleUrls: ['./rebalance-ticker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RebalanceTickerComponent implements OnInit, OnDestroy {

  @Input() form: AbstractControl = new FormGroup({});
  @Input() index: number = 0;
  @Input() results: RebalanceResult[] | null = [];

  @Output() removeTicker = new EventEmitter();
  @Output() changeTicker = new EventEmitter();

  private onDestroy$: Subject<void> = new Subject();

  constructor() { }

  ngOnInit() {
    this.form.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    ).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((value) => this.changeTicker.emit(value));
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  getFb = () => this.form as FormGroup;

  getAdditionalAmount = () => this.results ? this.results.find((e) => e.name === this.form.value.name)?.additionalAmount : 0;

  abs = (value: number) => Math.abs(value);

}
