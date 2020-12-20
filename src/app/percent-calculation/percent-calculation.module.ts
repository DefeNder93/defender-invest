import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PercentCalculationComponent } from './percent-calculation.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    PercentCalculationComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PercentCalculationModule { }
