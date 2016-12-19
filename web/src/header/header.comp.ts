import { Component, ViewChild, Renderer, ElementRef } from '@angular/core';
import { Router, NavigationStart } from "@angular/router";

import { SideNavService } from '../../quSquared/side-nav/side-nav.svc';

@Component({
  selector: 'sl-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
	providers: [SideNavService]
})
export class HeaderComponent {
  @ViewChild('inpSearchFor') inpSearchFor: ElementRef;
	public searchFocus: boolean = false;
	public searchFor: string = null;

	constructor(
		private sideNavSvc: SideNavService,
		private router: Router,
		private renderer: Renderer
	) 
	{

		// this.router.events.subscribe(value => {
		// 	if (value instanceof NavigationStart) {
		// 		if (value.url === '/' || value.url.indexOf('sign-up') > -1 || value.url.indexOf('sign-in') > -1) {
		// 			if (this.sideNavSvc.isOpen()) {					
		// 				this.toggle();	
		// 			}
		// 		}
		// 	}
		// });
	}

	toggle() {
		this.sideNavSvc.toggle();
	}

	toggleSearch() {
		this.searchFocus = !this.searchFocus;

		if (this.searchFocus) {
			setTimeout(() => {
				this.renderer.invokeElementMethod(this.inpSearchFor.nativeElement, 'focus');
			}, 0);
		}
	}
}
