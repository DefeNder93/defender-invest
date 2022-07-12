import { Component } from '@angular/core';
import { SpreadsService } from '../../shared/services/spreads.service';
import { switchMap, take } from 'rxjs/operators';
import { Api } from '../../shared/services/api.service';
import { SpreadParams } from '../../shared/models/spread-params.model';
import { ChardSpread } from '../../shared/models/spread-response.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-spreads',
  templateUrl: './spreads.component.html',
  styleUrls: ['./spreads.component.scss']
})
export class SpreadsComponent {

  spreads$ = new BehaviorSubject<ChardSpread[]>([]);

  constructor(private spreadsService: SpreadsService, private api: Api) { }

  launch = (params: SpreadParams) => {
    this.spreadsService.getSpreads().pipe(
      switchMap((spreads) => this.api.getChartData(params)),
      take(1)
    ).subscribe((r) => {
      console.log('launch', r);
    });
  }

  launchDev = () => {
    this.api.getChartDataDev().subscribe((r) => {
      // console.log('launchDev', r.spreads[0].data[0]);
      // console.log('launchDev2', r.spreads[1].data[0]);
      this.spreads$.next(r.spreads);
    });
  }

}
