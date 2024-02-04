import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class PercentCalculationService {
  constructor() {}

  calculateYearlyIncome = (from: string, to: string, totalPercent: number) => {
    const yearsNum =
      moment.duration(moment(to, 'YYYY-mm-dd').diff(moment(from, 'YYYY-mm-dd'))).as('days') / 365;

    return totalPercent ? (Math.pow((totalPercent - 100) / 100 + 1, 1 / yearsNum) - 1) * 100 : null;
  };
}
