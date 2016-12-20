import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'sl-profile-view',
	templateUrl: './profile-view.html',
	providers: []
})
export class ProfileViewComponent implements OnInit {
	profile: any = {};
	contents: any[];

	constructor() {
		this.profile.avatarImg = '../../../img/my-profile.jpg';
		this.profile.bgImg = null;
		this.profile.name = 'Michael Taylor';
		this.profile.followers = 10;
		this.profile.following = 8;
		this.profile.tricks = 18;
		this.profile.rank = 5;
		this.profile.gamesPlayed = 22;

		this.contents = [
			{ url: '../../../img/my-profile.jpg' },
			{ url: '../../../img/my-profile.jpg' },
			{ url: '../../../img/my-profile.jpg' },
			{ url: '../../../img/my-profile.jpg' }
		];
	}

	ngOnInit() {

	}
}