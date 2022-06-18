import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpreadsRoutingModule } from './spreads-routing.module';
import { SpreadsComponent } from './pages/spreads/spreads.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SpreadsComponent
  ],
  imports: [
    CommonModule,
    SpreadsRoutingModule,
    SharedModule
  ]
})
export class SpreadsModule { }
