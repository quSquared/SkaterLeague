import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule, JsonpModule }  from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { QuSquaredModule } from '../../quSquared';

import { AppRoutes } from './app.routes';
import { AppComponent } from './app.comp';

import { HeaderComponent } from '../header/header.comp';
import { SideNavComponent } from '../side-nav/side-nav.comp';
import { HomeModule } from '../home/home.module';
import { ProfileModule } from '../profile/profile.module';
import { SignInModule } from '../sign-in/sign-in.module';
import { SignUpModule } from '../sign-up/sign-up.module';
import { SplashModule } from '../splash/splash.module';
import { TrickModule } from '../trick/trick.module';

import { UserService } from '../user/user.svc';

@NgModule({
  imports: [
    BrowserModule,
		FormsModule,
    HttpModule,
    JsonpModule,
    QuSquaredModule,
		HomeModule,
		ProfileModule,
    SignInModule,
		SignUpModule,
		SplashModule,
		TrickModule,
    RouterModule.forRoot(AppRoutes)
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
		SideNavComponent

  ],
  providers: [
		UserService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
