import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpreadsRoutingModule } from './spreads-routing.module';
import { SpreadsComponent } from './pages/spreads/spreads.component';


@NgModule({
  declarations: [
  
    SpreadsComponent
  ],
  imports: [
    CommonModule,
    SpreadsRoutingModule
  ]
})
export class SpreadsModule { }
