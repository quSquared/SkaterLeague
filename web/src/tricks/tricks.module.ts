import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule }  from '@angular/common';

import { QuSquaredModule, FlexLayoutModule } from '../../quSquared';

import { TricksRoutes } from "./tricks.routes";
import { TrickResolver } from "./trick/trick.resolve";
import { TrickComponent } from "./trick/trick.comp";

@NgModule({
  imports: [
    CommonModule,
		FormsModule,
    TricksRoutes,
		QuSquaredModule,
		FlexLayoutModule.forRoot()
  ],
  declarations: [
    TrickComponent
  ],
	providers: [
		TrickResolver
	]
})
export class TricksModule { }