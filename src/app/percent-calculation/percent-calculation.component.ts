import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime, map, startWith, takeUntil} from "rxjs/operators";
import {Observable, of, Subject} from "rxjs";
import {PercentCalculationService} from "./percent-calculation.service";
import {StorageService} from "../storage.service";
import {PercentCalcParams} from "../shared/models/percent-calc.model";

@Component({
  selector: 'app-percent-calculation',
  templateUrl: './percent-calculation.component.html',
  styleUrls: ['./percent-calculation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PercentCalculationComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<void> = new Subject();

  public form: FormGroup = this.fb.group({
    from: [null],
    to: [null],
    totalPercent: [null]
  });

  public yearlyIncome$: Observable<string> = of('-');

  constructor(
    private fb: FormBuilder,
    private percentCalculationService: PercentCalculationService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.form.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.onDestroy$)
      )
      .subscribe((value) => this.storageService.savePercentCalcParams(value));
    const params = this.storageService.getPercentCalcParams() as PercentCalcParams;
    params && this.form.patchValue(params);


    this.yearlyIncome$ = this.form.valueChanges.pipe(
      debounceTime(300),
      startWith(params ? params : {from: null, to: null, totalPercent: null}),
      map(({from, to, totalPercent}) => this.percentCalculationService.calculateYearlyIncome(from, to, totalPercent)),
      map((value) => value === null ? '-' : value + '')
    );

    this.yearlyIncome$.subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
