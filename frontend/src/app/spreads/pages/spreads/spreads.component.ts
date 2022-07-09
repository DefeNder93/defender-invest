import { Component, OnInit } from '@angular/core';
import { SpreadsService } from '../../shared/services/spreads.service';
import { switchMap, take } from 'rxjs/operators';
import { Api } from '../../shared/services/api.service';

@Component({
  selector: 'app-spreads',
  templateUrl: './spreads.component.html',
  styleUrls: ['./spreads.component.scss']
})
export class SpreadsComponent implements OnInit {

  constructor(private spreadsService: SpreadsService, private api: Api) { }

  ngOnInit(): void {
  }

  launch = () => {
    this.spreadsService.getSpreads().pipe(
      switchMap((spreads) => this.api.getChartData(spreads)),
      take(1)
    ).subscribe((r) => {
      console.log('launch', r);
    });
  }

}
