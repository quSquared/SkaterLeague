import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule }  from '@angular/common';

import { QuSquaredModule } from '../../quSquared';

import { TrickRoutes } from "./trick.routes";
import { FlipTrickComponent } from "./flip-trick/flip-trick.comp";

@NgModule({
  imports: [
    CommonModule,
		FormsModule,
    TrickRoutes,
		QuSquaredModule
  ],
  declarations: [
    FlipTrickComponent
  ]
})
export class TrickModule { }