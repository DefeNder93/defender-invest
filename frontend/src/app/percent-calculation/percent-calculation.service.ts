import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class PercentCalculationService {
  calculateYearlyIncome = (from: string, to: string, totalPercent: number) => {
    if (!totalPercent) {
      return null;
    }
    const yearsNum =
      moment.duration(moment(to, 'YYYY-mm-dd').diff(moment(from, 'YYYY-mm-dd'))).as('days') / 365;
    const result = (Math.pow(totalPercent / 100 + 1, 1 / yearsNum) - 1) * 100;
    return Math.round(result * 100) / 100;
  };
}
