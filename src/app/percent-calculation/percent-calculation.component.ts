import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime, map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {PercentCalculationService} from "./percent-calculation.service";

@Component({
  selector: 'app-percent-calculation',
  templateUrl: './percent-calculation.component.html',
  styleUrls: ['./percent-calculation.component.scss']
})
export class PercentCalculationComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    from: ['2018-07-22'],
    to: ['2019-07-22'],
    totalPercent: [null]
  });

  public yearlyIncome$: Observable<string> = this.form.valueChanges.pipe(
    debounceTime(300),
    map(({from, to, totalPercent}) => this.percentCalculationService.calculateYearlyIncome(from, to, totalPercent)),
    map((value) => value === null ? '-' : value + ''),
    startWith('-')
  );

  constructor(private fb: FormBuilder, private percentCalculationService: PercentCalculationService) { }

  ngOnInit() {
  }

}
