import { Component, EventEmitter, Output } from '@angular/core';
import {
  SpreadDates,
  SpreadParams,
  SpreadSettings,
} from '../../../shared/models/spread-params.model';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Spread } from '../../../shared/models/spread.model';
import * as moment from 'moment';
import { SpreadParamsService } from '../../../shared/services/spread-params.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent {
  constructor(private paramsService: SpreadParamsService) {}

  dates$ = new BehaviorSubject<SpreadDates | null>(null);
  spreads$ = new BehaviorSubject<Spread[] | null>(null);
  settings$ = new BehaviorSubject<SpreadSettings | null>(null);
  launchEnabled$ = combineLatest([this.dates$, this.spreads$, this.settings$]).pipe(
    map(([dates, spreads, settings]) => !!dates && !!spreads && !!settings),
  );

  @Output() launch = new EventEmitter<SpreadParams>();

  runLaunch = () => {
    if (!this.dates$.value || !this.spreads$.value || !this.settings$.value) {
      console.warn('One of launch settings is not defined, aborted');
      return;
    }
    this.launch.next({
      dates: {
        ...this.dates$.value,
        startDate: moment(this.dates$.value.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.dates$.value.endDate).format('YYYY-MM-DD'),
      },
      spreads: this.spreads$.value,
      settings: this.settings$.value,
    });
  };

  updateSettings = (settings: SpreadSettings) => {
    this.settings$.next(settings);
    this.saveParams();
  };

  updateDates = (dates: SpreadDates) => {
    this.dates$.next(dates);
    this.saveParams();
  };

  updateSpreads = (spreads: Spread[]) => {
    this.spreads$.next(spreads);
    this.saveParams();
  };

  private saveParams = () => {
    this.paramsService.saveSpreadParams({
      dates: this.dates$.value,
      spreads: this.spreads$.value,
      settings: this.settings$.value,
    });
  };
}
