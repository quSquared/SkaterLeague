import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { SignUpService } from './sign-up.svc';

@Component({
	selector: 'sl-sign-up',
	templateUrl: './sign-up.html',
	providers: [SignUpService],
	styleUrls: ['./sign-up.scss']
})
export class SignUpComponent implements OnInit {
	errorMessage: string;

	constructor(private signUpService: SignUpService) {		
	}

	ngOnInit() {

	}

	signUp(f: NgForm) {
		let user = {
			email: f.value.email,
			password: f.value.password
		};

		this.signUpService.register(user)
			.subscribe(
				response => {
					// direct to profile
					console.log('token', response);
				},			
				error => this.errorMessage = <any>error);
	}
}