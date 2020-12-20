import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RebalanceComponent } from './rebalance.component';
import { RebalanceCommonParamsComponent } from './rebalance-common-params/rebalance-common-params.component';
import { RebalanceResultsComponent } from './rebalance-results/rebalance-results.component';
import { RebalanceTickerComponent } from './rebalance-ticker/rebalance-ticker.component';

@NgModule({
  declarations: [
    RebalanceComponent,
    RebalanceCommonParamsComponent,
    RebalanceResultsComponent,
    RebalanceTickerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RebalanceModule { }
