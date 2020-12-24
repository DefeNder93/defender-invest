import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PercentCalculationService {

  constructor() { }

  calculateYearlyIncome = (from: string, to: string, totalPercent: number) => {
    const yearsNum = 17;  // TODO

    // Math.pow(base, exponent)
    return totalPercent ? (Math.pow((totalPercent - 100)/100 + 1, 1/yearsNum) - 1) * 100 : null;
  }
}
