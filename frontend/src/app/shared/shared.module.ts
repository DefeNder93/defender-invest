import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MenuComponent } from './components/menu/menu.component';
import {RouterModule} from "@angular/router";
import { CloseChartComponent } from './components/close-chart/close-chart.component';

const MATERIAL_MODULES = [
  MatInputModule,
  MatIconModule,
  MatFormFieldModule
];

const COMMON_MODULES = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  RouterModule
];

const COMPONENTS = [
  MenuComponent,
  CloseChartComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...COMMON_MODULES,
    ...MATERIAL_MODULES
  ],
  exports: [
    ...COMMON_MODULES,
    ...MATERIAL_MODULES,
    ...COMPONENTS
  ]
})
export class SharedModule { }
