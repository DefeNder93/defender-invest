import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PercentCalculationModule} from './percent-calculation/percent-calculation.module';
import {RebalanceModule} from "./rebalance/rebalance.module";

const APP_MODULES = [
  PercentCalculationModule,
  RebalanceModule
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...APP_MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
