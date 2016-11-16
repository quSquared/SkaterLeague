import { Component, OnInit, NgZone } from '@angular/core';
import { SignInService } from './sign-in.svc';
// Google's login API namespace
declare var gapi:any;

@Component({
  selector: 'sl-sign-in',
  templateUrl: './sign-in.html',
  providers: [ SignInService ],
  styleUrls: ['./sign-in.scss']
})
export class SignInComponent implements OnInit { 
    errorMessage: string;

    constructor (private signInService: SignInService, private zone: NgZone) {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        gapi.signin2.render('my-signin2', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'light',
            'onsuccess': param => this.onGoogleLoginSuccess(param)
        });
    }

    onGoogleLoginSuccess = (googleUser) => {
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
    }

    signIn() {
      this.signInService.authenticate()
        .subscribe(
          response => console.log('authenticate', response),
          error =>  this.errorMessage = <any>error);
    }

    getFlipTricks() {
      this.signInService.getFlipTricks()
        .subscribe(
          response => console.log('flipTricks', response),
          error =>  this.errorMessage = <any>error);
    }
}