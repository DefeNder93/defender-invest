import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Spread } from '../models/spread.model';
import { Api } from './api.service';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpreadsService {
  private spreads$ = new BehaviorSubject<Spread[]>([]);

  tickers$: Observable<string[]> = this.api.getTickers().pipe(
    map((r) => r.tickers),
    shareReplay(1)
  );

  constructor(private api: Api) {
  }

  getSpreads = () => this.spreads$.asObservable();

  addSpread = (spread: Spread) => this.spreads$.next(this.spreads$.value.concat(spread));

  removeSpread = (spread: Spread) => this.spreads$.next(this.spreads$.value.filter(e => e.leg1 !== spread.leg1 && e.leg2 !== spread.leg2));
}
