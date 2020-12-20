import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";

const MATERIAL_COMPONENTS = [
  MatInputModule,
  MatIconModule,
  MatFormFieldModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MATERIAL_COMPONENTS
  ],
  exports: [
    MATERIAL_COMPONENTS
  ]
})
export class SharedModule { }
