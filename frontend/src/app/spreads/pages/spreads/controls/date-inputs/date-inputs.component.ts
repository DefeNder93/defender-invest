import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpreadDates } from '../../../../shared/models/spread-params.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ParamsService } from '../../../../shared/services/params.service';

@Component({
  selector: 'app-date-inputs',
  templateUrl: './date-inputs.component.html',
  styleUrls: ['./date-inputs.component.scss']
})
export class DateInputsComponent implements OnInit, OnDestroy {
  @Output() update = new EventEmitter<SpreadDates>();

  form: FormGroup = this.fb.group({
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
    firstYear: [null, Validators.required],
    lastYear: [null, Validators.required],
  });

  years: number[] = [];

  private onDestroy$: Subject<void> = new Subject();

  constructor(protected fb: FormBuilder, private paramsService: ParamsService) { }

  ngOnInit(): void {
    for (let i = 1990; i <= 2021; i++) {
      this.years.push(i);
    }
    this.form.valueChanges.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(() => this.form.valid && this.update.next(this.form.value));
    const params = this.paramsService.getParams();
    params?.dates && this.form.patchValue(params.dates, {emitEvent: false});
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
