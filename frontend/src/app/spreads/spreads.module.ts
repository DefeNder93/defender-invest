import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpreadsRoutingModule } from './spreads-routing.module';
import { SpreadsComponent } from './pages/spreads/spreads.component';
import { SharedModule } from '../shared/shared.module';
import { ControlsComponent } from './pages/spreads/controls/controls.component';
import { DateInputsComponent } from './pages/spreads/controls/date-inputs/date-inputs.component';
import { TickersInputsComponent } from './pages/spreads/controls/tickers-inputs/tickers-inputs.component';
import { SettingsInputsComponent } from './pages/spreads/controls/settings-inputs/settings-inputs.component';

@NgModule({
  declarations: [
    SpreadsComponent,
    ControlsComponent,
    DateInputsComponent,
    TickersInputsComponent,
    SettingsInputsComponent,
  ],
  imports: [CommonModule, SpreadsRoutingModule, SharedModule],
})
export class SpreadsModule {}
