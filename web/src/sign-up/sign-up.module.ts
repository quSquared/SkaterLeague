import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule }  from '@angular/common';

import { ButtonModule, InputContainerModule } from '../../quSquared';

import { SignUpRoutes } from "./sign-up.routes";
import { SignUpComponent } from "./sign-up.comp";

@NgModule({
  imports: [
    CommonModule,
		FormsModule,
    SignUpRoutes,
		ButtonModule,
		InputContainerModule
  ],
  declarations: [
    SignUpComponent
  ]
})
export class SignUpModule { }