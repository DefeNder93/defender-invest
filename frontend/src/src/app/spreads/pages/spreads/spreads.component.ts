import { Component } from '@angular/core';
import { SpreadsService } from '../../shared/services/spreads.service';
import { switchMap, take } from 'rxjs/operators';
import { Api } from '../../shared/services/api.service';
import { SpreadParams } from '../../shared/models/spread-params.model';
import { ChardSpread, FEChardSpread } from '../../shared/models/spread-response.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-spreads',
  templateUrl: './spreads.component.html',
  styleUrls: ['./spreads.component.scss'],
})
export class SpreadsComponent {
  spreads$ = new BehaviorSubject<FEChardSpread[]>([]);

  constructor(
    private spreadsService: SpreadsService,
    private api: Api,
  ) {}

  launch = (params: SpreadParams) => {
    this.spreadsService
      .getSpreads()
      .pipe(
        switchMap((spreads) => this.api.getChartData(params)),
        take(1),
      )
      .subscribe((r) => {
        const s = [
          {
            data: r.data[0].spreads[0].closes.map((close, i) => [
              r.data[0].spreads[0].dates[i],
              close,
            ]),
          },
        ];
        this.spreads$.next(s as FEChardSpread[]);
      });
  };
}
