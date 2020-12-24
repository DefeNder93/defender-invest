import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const MATERIAL_MODULES = [
  MatInputModule,
  MatIconModule,
  MatFormFieldModule
];

const COMMON_MODULES = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule
];

@NgModule({
  declarations: [],
  imports: [
    ...COMMON_MODULES,
    ...MATERIAL_MODULES
  ],
  exports: [
    ...COMMON_MODULES,
    ...MATERIAL_MODULES
  ]
})
export class SharedModule { }
