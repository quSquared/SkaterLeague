import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';

import { SignInRoutes } from "./sign-in.routes";
import { SignInComponent } from "./sign-in.comp";

@NgModule({
  imports: [
    CommonModule,
    SignInRoutes
  ],
  declarations: [
    SignInComponent
  ]
})
export class SignInModule { }