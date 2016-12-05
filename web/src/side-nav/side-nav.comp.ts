import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from './../user/user.svc';

@Component({
  selector: 'sl-side-nav',
  templateUrl: './side-nav.html',
	providers: []
})
export class SideNavComponent implements OnDestroy { 
	user: any;
  subscription: Subscription;

	constructor(
		private userSvc: UserService) {

			this.subscription = this.userSvc.getLoggedIn().subscribe(user => {
				this.user = user;
			});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
