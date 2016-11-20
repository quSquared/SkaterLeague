import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule, JsonpModule }  from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from "./app.routes";
import { AppComponent } from './app.comp';
import { HeaderComponent } from '../header/header.comp';
import { SignInModule } from "../sign-in/sign-in.module";
import { SignUpModule } from "../sign-up/sign-up.module";
import { SplashModule } from "../splash/splash.module";

@NgModule({
  imports: [
    BrowserModule,
		FormsModule,
    HttpModule,
    JsonpModule,
    SignInModule,
		SignUpModule,
		SplashModule,
    RouterModule.forRoot(AppRoutes)
  ],
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
