import { NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AuthProviders, AppRoutes } from "./app.routes";
import { AppComponent } from "./app.comp";
import { BackendService } from "./services";

import { SignInModule } from "./sign-in/sign-in.module";

@NgModule({
  providers: [
  ],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(AppRoutes),
    SignInModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }