import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import * as _ from "lodash";

import { TrickService } from './trick.svc';

enum Status {
	Stop = 0,
	Start = 1,
	InProgress = 2,
	Completed = 3
};

@Component({
	selector: 'sl-trick',
	templateUrl: './trick.html',
	providers: [
		TrickService
	]
})
export class TrickComponent implements OnInit {
	public tricks: any[];
	public trickUrl?: SafeResourceUrl;
	public activeIndex?: number;
	public activeTrick?: any;
	public userTricks: {
		trickName: string,
		statusName: string
	}[];

	constructor(private trickSvc: TrickService,
		private sanitizer: DomSanitizer,
		private activatedRoute: ActivatedRoute) 
	{
		this.trickSvc.getAll().subscribe(response => {
			this.tricks = response;
		},
			error => { });
	}

	ngOnInit() {
		this.userTricks = this.activatedRoute.snapshot.data['userTricks'];
	}

	public viewTrick (index: number, trick: any) {
		this.activeIndex = index;
		this.activeTrick = trick;

		if (this.hasTrick(this.activeTrick.name)) {
			let userTrickIndex = this.findIndexByUserTricks(this.activeTrick.name);
			this.activeTrick.statusName = this.userTricks[userTrickIndex].statusName;
		}

		this.trickUrl = this.sanitizer.bypassSecurityTrustResourceUrl(trick.url);
	}

	public hasTrick (trickName) {
		return this.findIndexByUserTricks(trickName) >= 0;
	}

	private findIndexByUserTricks (trickName) {
		return _.findIndex(this.userTricks, (userTrick) => { return userTrick.trickName == trickName });
	}
}