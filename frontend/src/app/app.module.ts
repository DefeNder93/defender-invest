import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PercentCalculationModule} from './percent-calculation/percent-calculation.module';
import {RebalanceModule} from './rebalance/rebalance.module';
import {SharedModule} from './shared/shared.module';
import {StaticPagesModule} from './static-pages/static-pages.module';
import { HttpClientModule } from '@angular/common/http';

const ANGULAR_MODULES = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  HttpClientModule
];

const APP_MODULES = [
  SharedModule,
  PercentCalculationModule,
  RebalanceModule,
  StaticPagesModule
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...ANGULAR_MODULES,
    ...APP_MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
