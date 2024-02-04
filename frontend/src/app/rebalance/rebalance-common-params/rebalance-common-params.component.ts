import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { RebalanceParams } from '../../shared/models/rebalance-ticker.model';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-rebalance-common-params',
  templateUrl: './rebalance-common-params.component.html',
  styleUrls: ['./rebalance-common-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RebalanceCommonParamsComponent implements OnInit, OnDestroy, OnChanges {
  private onDestroy$: Subject<void> = new Subject();

  public form: UntypedFormGroup = this.fb.group({
    totalAmount: [null],
    cash: [null],
    invested: [null],
    multiplier: [null],
    rebalanceAmount: [null],
  });

  @Output() paramsUpdate = new EventEmitter<RebalanceParams>();
  @Input() initialParams: RebalanceParams | null = null;
  @Input() rebalanceAmount: number | null = null;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.form.valueChanges
      .pipe(debounceTime(300), takeUntil(this.onDestroy$))
      .subscribe((value) => this.paramsUpdate.next(value));
    this.initialParams && this.form.patchValue(this.initialParams);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  distractCash = () => {
    const { totalAmount, cash } = this.form.value;
    this.form.controls.invested.patchValue(totalAmount - cash);
  };

  calculateRebalanceAmount = () => {
    const { invested, multiplier } = this.form.value;
    this.form.controls.rebalanceAmount.patchValue(Math.round(invested * multiplier));
  };

  ngOnChanges(changes: SimpleChanges): void {
    changes.rebalanceAmount?.currentValue &&
      this.form.patchValue({ rebalanceAmount: changes.rebalanceAmount.currentValue });
  }
}
