import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { SignUpService } from './sign-up.svc';
import { UserService } from './../user/user.svc';

@Component({
	selector: 'sl-sign-up',
	templateUrl: './sign-up.html',
	providers: [SignUpService]
})
export class SignUpComponent implements OnInit {
	errorMessage: string;

	constructor(
		private signUpService: SignUpService,
		private userSvc: UserService,
		private router: Router) {		
	}

	ngOnInit() {

	}

	signUp(user: any) {
		this.signUpService.register(user)
			.subscribe(
				response => {
					// direct to profile
					this.userSvc.setLoggedIn(response);
					this.router.navigate(['home']);
				},			
				error => this.errorMessage = <any>error);
	}
}