import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignInService } from './sign-in.svc';

@Component({
	selector: 'sl-sign-in',
	templateUrl: './sign-in.html',
	providers: [SignInService],
	styleUrls: ['./sign-in.scss']
})
export class SignInComponent implements OnInit {
	emailLabel: string = 'Email';
	passwordLabel: string = 'Password';
	errorMessage: string;

	constructor(
		private signInService: SignInService,
		private zone: NgZone) {
		// this.zone.run(() => {
		//   $.proxy(this.onGoogleLoginSuccess, this);
		// });
	}

	ngOnInit() {

	}

	ngAfterViewInit() {
		// Component views are initialized
		// gapi.signin2.render('my-signin2', {
		//   'scope': 'profile email',
		//   'width': 240,
		//   'height': 50,
		//   'longtitle': true,
		//   'theme': 'light',
		//   'onsuccess': params => this.onGoogleLoginSuccess(params)
		// });
	}

	signIn(f: NgForm) {
		let user = {
			email: f.value.email,
			password: f.value.password
		};

		this.signInService.login(user)
			.subscribe(
			response => {
				console.log('token', response);
			},
			error => this.errorMessage = <any>error);
	}

	signInWithGoogle() {
		this.signInService.googleAuth()
			.subscribe(
			response => this.onGoogleLoginSuccess,
			error => this.errorMessage = <any>error);
	}

	onGoogleLoginSuccess = (googleUser) => {
		console.log('onGoogleLoginSuccess'); // Do not send to your backend! Use an ID token instead.
		this.zone.run(() => {
			var profile = googleUser.getBasicProfile();
			console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
			console.log('Name: ' + profile.getName());
			console.log('Image URL: ' + profile.getImageUrl());
			console.log('Email: ' + profile.getEmail());
		});
	}
}