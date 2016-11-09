import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";

import { SignInRoutes } from "./sign-in.routes";
import { SignInComponent } from "./sign-in.comp";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    SignInRoutes
  ],
  declarations: [
    SignInComponent
  ]
})
export class SignInModule { }