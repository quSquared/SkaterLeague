import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule }  from '@angular/common';

import { QuSquaredModule } from '../../quSquared';

import { SignUpRoutes } from "./sign-up.routes";
import { SignUpComponent } from "./sign-up.comp";

@NgModule({
  imports: [
    CommonModule,
		FormsModule,
    SignUpRoutes,
		QuSquaredModule
  ],
  declarations: [
    SignUpComponent
  ]
})
export class SignUpModule { }