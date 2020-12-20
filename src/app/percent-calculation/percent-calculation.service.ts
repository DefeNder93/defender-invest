import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PercentCalculationService {

  constructor() { }

  calculateYearlyIncome = (from: string, to: string, totalPercent: number) => {
    return totalPercent;
  }
}
