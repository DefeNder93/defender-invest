import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PercentCalculationComponent} from './percent-calculation/percent-calculation.component';

const routes: Routes = [
  {path: 'percent-calculation', component: PercentCalculationComponent},
  {path: '**', redirectTo: 'percent-calculation'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
