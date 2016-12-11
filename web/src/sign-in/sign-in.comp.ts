import { Component, NgZone } from '@angular/core';
import { Router } from "@angular/router";

import { SignInService } from './sign-in.svc';
import { UserService } from './../user/user.svc';

@Component({
	selector: 'sl-sign-in',
	templateUrl: './sign-in.html',
	providers: [
		SignInService
	]
})
export class SignInComponent {
	errorMessage: string;

	constructor(
		private router: Router,
		private signInSvc: SignInService,
		private userSvc: UserService,
		private zone: NgZone) {
	}

	signIn(user: any) {
		this.signInSvc.login(user)
			.subscribe(
			response => {
				this.userSvc.setLoggedIn(response);
				this.router.navigate(['home']);
			},
			error => this.errorMessage = <any>error);
	}
}