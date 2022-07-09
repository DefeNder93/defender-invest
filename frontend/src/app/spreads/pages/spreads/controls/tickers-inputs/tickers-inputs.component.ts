import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SpreadsService } from '../../../../shared/services/spreads.service';
import { Spread } from '../../../../shared/models/spread.model';

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
  options: string[] = ['BCN', 'GOQ', 'GOG'];  // TODO take from BE
  spreads$: Observable<Spread[]> = this.spreadsService.getSpreads();

  constructor(private spreadsService: SpreadsService) {
  }

  ngOnInit() {
    this.filteredLeg1Items = this.leg1Control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.filteredLeg2Items = this.leg2Control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  add = () => {
    this.leg1Control.value && this.leg2Control.value &&
      this.spreadsService.addSpread({leg1: this.leg1Control.value, leg2:  this.leg2Control.value});
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
