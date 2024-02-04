import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { debounceTime, map, startWith, takeUntil } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { PercentCalculationService } from './percent-calculation.service';
import { StorageService } from '../storage.service';
import { PercentCalcParams } from '../shared/models/percent-calc.model';
import * as moment from 'moment';

@Component({
  selector: 'app-percent-calculation',
  templateUrl: './percent-calculation.component.html',
  styleUrls: ['./percent-calculation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PercentCalculationComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject();

  public form: UntypedFormGroup = this.fb.group({
    from: [null],
    to: [null],
    totalPercent: [null],
  });

  setToNow = () => {
    this.form.controls.to.patchValue(moment().format('YYYY-MM-DD'));
    this.storageService.savePercentCalcParams(this.form.value);
  };

  public yearlyIncome$: Observable<string> = of('-');

  constructor(
    private fb: UntypedFormBuilder,
    private percentCalculationService: PercentCalculationService,
    private storageService: StorageService,
  ) {}

  ngOnInit() {
    this.form.valueChanges
      .pipe(debounceTime(300), takeUntil(this.onDestroy$))
      .subscribe((value) => this.storageService.savePercentCalcParams(value));
    const params = this.storageService.getPercentCalcParams() as PercentCalcParams;
    params && this.form.patchValue(params);

    this.yearlyIncome$ = this.form.valueChanges.pipe(
      debounceTime(300),
      startWith(null),
      map(({ from, to, totalPercent }) =>
        this.percentCalculationService.calculateYearlyIncome(from, to, totalPercent),
      ),
      map((value) => (value === null ? '-' : value + '')),
    );

    this.yearlyIncome$.subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
