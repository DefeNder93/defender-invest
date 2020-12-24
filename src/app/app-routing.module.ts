import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PercentCalculationComponent} from './percent-calculation/percent-calculation.component';
import {RebalanceComponent} from "./rebalance/rebalance.component";

const routes: Routes = [
  {path: 'rebalance', component: RebalanceComponent},
  {path: 'percent-calculation', component: PercentCalculationComponent},
  {path: '**', redirectTo: 'percent-calculation'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
