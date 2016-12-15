import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule }  from '@angular/common';

import { QuSquaredModule, FlexLayoutModule } from '../../quSquared';

import { TricksRoutes } from "./tricks.routes";
import { FlipTrickComponent } from "./flip-trick/flip-trick.comp";

@NgModule({
  imports: [
    CommonModule,
		FormsModule,
    TricksRoutes,
		QuSquaredModule,
		FlexLayoutModule.forRoot()
  ],
  declarations: [
    FlipTrickComponent
  ]
})
export class TricksModule { }