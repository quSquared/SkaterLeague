import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule }  from '@angular/common';

import { QuSquaredModule } from '../../quSquared';

import { SplashRoutes } from "./splash.routes";
import { SplashComponent } from "./splash.comp";

@NgModule({
  imports: [
    CommonModule,
		FormsModule,
    SplashRoutes,
		QuSquaredModule
  ],
  declarations: [
    SplashComponent
  ]
})
export class SplashModule { }