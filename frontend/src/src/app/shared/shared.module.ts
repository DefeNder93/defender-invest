import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { CloseChartComponent } from './components/close-chart/close-chart.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { ChartParamsComponent } from './components/close-chart/chart-params/chart-params.component';

const MATERIAL_MODULES = [
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatSelectModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatChipsModule,
];

const COMMON_MODULES = [FormsModule, ReactiveFormsModule, CommonModule, RouterModule];

const COMPONENTS = [MenuComponent, CloseChartComponent, ChartParamsComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...COMMON_MODULES, ...MATERIAL_MODULES],
  exports: [...COMMON_MODULES, ...MATERIAL_MODULES, ...COMPONENTS],
})
export class SharedModule {}
