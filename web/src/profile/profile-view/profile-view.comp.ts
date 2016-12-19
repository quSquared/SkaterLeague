import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'sl-profile-view',
	templateUrl: './profile-view.html',
	providers: []
})
export class ProfileViewComponent implements OnInit {
	profile: any = {};

	constructor() {
		this.profile.avatarImg = '../../../img/my-profile.jpg';
		this.profile.bgImg = null;
	}

	ngOnInit() {

	}
}