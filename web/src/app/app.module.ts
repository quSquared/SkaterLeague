import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule, JsonpModule }  from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from "./app.routes";
import { AppComponent } from './app.comp';
import { HeaderComponent } from '../header/header.comp';
import { SignInModule } from "../sign-in/sign-in.module";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    SignInModule,
    RouterModule.forRoot(AppRoutes)
  ],
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
