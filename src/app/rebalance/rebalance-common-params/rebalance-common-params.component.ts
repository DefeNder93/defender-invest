import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RebalanceParams} from "../../shared/models/rebalance-ticker.model";
import { BehaviorSubject, Subject } from "rxjs";
import {debounceTime, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-rebalance-common-params',
  templateUrl: './rebalance-common-params.component.html',
  styleUrls: ['./rebalance-common-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RebalanceCommonParamsComponent implements OnInit, OnDestroy, OnChanges {

  private onDestroy$: Subject<void> = new Subject();

  public form: FormGroup = this.fb.group({
    totalInvestedAmount: [null],
    weeklyAddition: [null],
    multiplier: [null],
    activeInvestedAmount: [null],
    currentWeeklyMultiplied: [null],
    rebalanceAmount: [null]
  });

  public weeklyAdded$ = new BehaviorSubject(false);
  public weeklyAddedToRebalance$ = new BehaviorSubject(false);

  @Output() paramsUpdate = new EventEmitter<RebalanceParams>();
  @Input() initialParams: RebalanceParams | null = null;
  @Input() rebalanceAmount: number | null = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.onDestroy$)
      )
      .subscribe((value) => this.paramsUpdate.next(value));
    this.initialParams && this.form.patchValue(this.initialParams);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  addWeekly = () => {
    this.weeklyAdded$.next(true);
    this.form.patchValue({activeInvestedAmount: this.form.value.activeInvestedAmount + this.form.value.weeklyAddition})
    this.form.patchValue({currentWeeklyMultiplied: Math.round(this.form.value.weeklyAddition * this.form.value.multiplier)})
  }

  addWeeklyToRebalance = () => {
    this.weeklyAddedToRebalance$.next(true);
    this.form.patchValue({rebalanceAmount: this.form.value.rebalanceAmount + this.form.value.currentWeeklyMultiplied, currentWeeklyMultiplied: null})
  }

  ngOnChanges(changes: SimpleChanges): void {
    changes.rebalanceAmount?.currentValue &&
      this.form.patchValue({rebalanceAmount: changes.rebalanceAmount.currentValue})
  }

}
