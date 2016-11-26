import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule }  from '@angular/common';

import { ButtonModule, InputContainerModule } from '../../quSquared';

import { HomeRoutes } from './home.routes';
import { HomeComponent } from './home.comp';

@NgModule({
  imports: [
    CommonModule,
		FormsModule,
		HomeRoutes,
		ButtonModule,
		InputContainerModule,
  ],
  declarations: [
		HomeComponent
  ]
})
export class HomeModule { }