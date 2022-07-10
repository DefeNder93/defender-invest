import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SpreadsService } from '../../../../shared/services/spreads.service';
import { Spread } from '../../../../shared/models/spread.model';
import { Api } from '../../../../shared/services/api.service';

@Component({
  selector: 'app-tickers-inputs',
  templateUrl: './tickers-inputs.component.html',
  styleUrls: ['./tickers-inputs.component.scss']
})
export class TickersInputsComponent implements OnInit {
  leg1Control = new FormControl<string>('');
  leg2Control = new FormControl<string>('');
  filteredLeg1Items!: Observable<string[]>;
  filteredLeg2Items!: Observable<string[]>;
  options: string[] = ['BCN1', 'GOQ1', 'GOG1'];  // TODO take from BE
  spreads$: Observable<Spread[]> = this.spreadsService.getSpreads();
  tickers$: Observable<string[]> = this.spreadsService.tickers$;

  constructor(private spreadsService: SpreadsService, private api: Api) {
  }

  ngOnInit() {
    this.filteredLeg1Items = combineLatest([this.tickers$, this.leg1Control.valueChanges.pipe(startWith(''))]).pipe(
      map(([tickers, value]) => this._filter(tickers, value || '')),
    );
    this.filteredLeg2Items = combineLatest([this.tickers$, this.leg2Control.valueChanges.pipe(startWith(''))]).pipe(
      map(([tickers, value]) => this._filter(tickers, value || '')),
    );
  }

  add = () => {
    this.leg1Control.value && this.leg2Control.value &&
      this.spreadsService.addSpread({leg1: this.leg1Control.value, leg2:  this.leg2Control.value});
  }

  private _filter(tickers: string[], value: string): string[] {
    const filterValue = value.toLowerCase();
    return tickers.filter(option => option.toLowerCase().includes(filterValue));
  }
}
