import { Component } from '@angular/core';
import { Router, NavigationStart } from "@angular/router";

import { SideNavService } from '../../quSquared/side-nav/side-nav.svc';

@Component({
  selector: 'sl-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
	providers: [SideNavService]
})
export class HeaderComponent { 

	constructor(
		private sideNavSvc: SideNavService,
		private router: Router
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
}
