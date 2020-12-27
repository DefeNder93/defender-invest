import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PercentCalculationComponent} from './percent-calculation/percent-calculation.component';
import {RebalanceComponent} from "./rebalance/rebalance.component";
import {AboutComponent} from "./static-pages/about/about.component";

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'rebalance', component: RebalanceComponent},
  {path: 'percent-calculation', component: PercentCalculationComponent},
  {path: '**', redirectTo: 'about'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
