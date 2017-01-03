import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'sl-profile-view',
	templateUrl: './profile-view.html'
})
export class ProfileViewComponent implements OnInit {
	profile: any = {};
	contents: any[];

	constructor(private activatedRoute: ActivatedRoute) {		
		this.contents = [
			{ url: '../../../img/my-profile.jpg' },
			{ url: '../../../img/my-profile.jpg' },
			{ url: '../../../img/my-profile.jpg' },
			{ url: '../../../img/my-profile.jpg' }
		];
	}

	ngOnInit() {
		this.profile = this.activatedRoute.snapshot.data['profile'];
		this.profile.avatarImg = '../../../img/my-profile.jpg';
		this.profile.bgImg = null;
		this.profile.followers = 10;
		this.profile.following = 8;
		this.profile.rank = 5;
		this.profile.gamesPlayed = 22;
	}
}