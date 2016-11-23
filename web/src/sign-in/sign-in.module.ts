import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule }  from '@angular/common';

import { ButtonModule, InputContainerModule } from '../../quSquared';

import { SignInRoutes } from "./sign-in.routes";
import { SignInComponent } from "./sign-in.comp";

@NgModule({
  imports: [
    CommonModule,
		FormsModule,
    SignInRoutes,
		ButtonModule,
		InputContainerModule
  ],
  declarations: [
    SignInComponent
  ]
})
export class SignInModule { }