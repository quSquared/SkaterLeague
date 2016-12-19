import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { FlipTrickService } from './flip-trick.svc';

enum Status {
	Stop = 0,
	Start = 1,
	InProgress = 2,
	Completed = 3
};

@Component({
	selector: 'sl-flip-trick',
	templateUrl: './flip-trick.html',
	providers: [
		FlipTrickService
	]
})
export class FlipTrickComponent {
	public flipTricks: any[];
	public trickUrl?: SafeResourceUrl;
	public activeIndex?: number;
	public activeTrick?: any;

	constructor(private flipTrickSvc: FlipTrickService,
		private sanitizer: DomSanitizer) 
	{
		this.flipTrickSvc.getAll().subscribe(response => {
			this.flipTricks = response;
		},
			error => { });
	}

	public viewTrick (index: number, trick: any) {
		this.activeIndex = index;
		this.activeTrick = trick;
		this.activeTrick.status = index % 2 > 0 ? Status[3] : Status[2];
		this.trickUrl = this.sanitizer.bypassSecurityTrustResourceUrl(trick.url);
	}
}