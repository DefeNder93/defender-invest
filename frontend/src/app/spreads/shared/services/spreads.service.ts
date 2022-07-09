import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Spread } from '../models/spread.model';

@Injectable({
  providedIn: 'root'
})
export class SpreadsService {
  private spreads$ = new BehaviorSubject<Spread[]>([]);

  getSpreads = () => this.spreads$.asObservable();

  addSpread = (spread: Spread) => this.spreads$.next(this.spreads$.value.concat(spread));

  removeSpread = (spread: Spread) => this.spreads$.next(this.spreads$.value.filter(e => e.leg1 !== spread.leg1 && e.leg2 !== spread.leg2));
}
