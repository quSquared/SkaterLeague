import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule }  from '@angular/common';

import { QuSquaredModule } from '../../quSquared';

import { HomeRoutes } from './home.routes';
import { HomeComponent } from './home.comp';

@NgModule({
  imports: [
    CommonModule,
		FormsModule,
		HomeRoutes,
		QuSquaredModule
  ],
  declarations: [
		HomeComponent
  ]
})
export class HomeModule { }