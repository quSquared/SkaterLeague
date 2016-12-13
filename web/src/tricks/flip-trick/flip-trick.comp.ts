import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

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
	public trickUrl: SafeResourceUrl;
	public activeIndex: number;
	public activeTrick: any;

	constructor(private flipTrickSvc: FlipTrickService,
		private sanitizer: DomSanitizer) 
	{
		this.trickUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/nCrhf-pyX_g');
		this.flipTrickSvc.getAll().subscribe(response => {
			this.flipTricks = response;
		},
			error => { });
	}

	public viewTrick (index: number, trick: any) {
		this.activeIndex = index;
		this.activeTrick = trick;
	}
}