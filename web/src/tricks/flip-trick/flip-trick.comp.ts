import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { FlipTrickService } from './flip-trick.svc';

@Component({
	selector: 'sl-flip-trick',
	templateUrl: './flip-trick.html',
	providers: [
		FlipTrickService
	]
})
export class FlipTrickComponent {
	public flipTricks: any[];

	constructor(private flipTrickSvc: FlipTrickService) {
		this.flipTrickSvc.getAll().subscribe(response => {
			this.flipTricks = response;
		},
		error => {});
	}
}