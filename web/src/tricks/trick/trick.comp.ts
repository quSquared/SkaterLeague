import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import * as _ from 'lodash';

import { TrickService } from './trick.svc';
import { UserService } from '../../user/user.svc';
import { UserTrick } from '../../model/user-trick';

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
	public userTricks: UserTrick[];

	constructor(private trickSvc: TrickService,
		private userSvc: UserService,
		private sanitizer: DomSanitizer,
		private activatedRoute: ActivatedRoute) {
		this.trickSvc.getAll().subscribe(response => {
			this.tricks = response;
			this.sortTricks();
		},
			error => { });
	}

	ngOnInit() {
		this.userTricks = this.activatedRoute.snapshot.data['userTricks'];
	}

	public viewTrick(index: number, trick: any) {
		this.activeIndex = index;
		this.activeTrick = trick;

		if (this.hasTrick(this.activeTrick.name)) {
			let userTrickIndex = this.findIndexByUserTricks(this.activeTrick.name);
			this.activeTrick.statusName = this.getUserTrickByIndex(userTrickIndex).statusName;
		}

		this.trickUrl = this.sanitizer.bypassSecurityTrustResourceUrl(trick.url);
	}

	public setUserTrick(statusName: string) {
		if (!this.hasTrick(this.activeTrick.name)) {
			this.addUserTrick(statusName);
		}
		else {
			this.updateUserTrick(statusName);
		}
	}

	public addUserTrick(statusName: string) {
		let userTrick = new UserTrick();
		userTrick.trickId = this.activeTrick.id;
		userTrick.trickName = this.activeTrick.name;
		userTrick.statusName = statusName;
		this.userSvc.addTrick(userTrick).subscribe(response => {
			this.activeTrick.statusName = statusName;
			this.userTricks.push(response);
		})
	}

	public updateUserTrick(statusName: string) {
		let userTrickIndex = this.findIndexByUserTricks(this.activeTrick.name);
		let userTrick = this.getUserTrickByIndex(userTrickIndex);
		userTrick.statusName = statusName;

		this.userSvc.updateTrick(userTrick).subscribe(response => {
			this.activeTrick.statusName = statusName;
			this.userTricks[userTrickIndex].statusName = statusName;
		});
	}

	public stopUserTrick() {
		let userTrickIndex = this.findIndexByUserTricks(this.activeTrick.name);
		let userTrick = this.getUserTrickByIndex(userTrickIndex);
		this.userSvc.deleteTrick(userTrick).subscribe(response => {
			this.userTricks.splice(userTrickIndex, 1);
			this.activeTrick.statusName = null;
		});
	}

	public hasTrick(trickName: string, statusName?: string) {
		return this.findIndexByUserTricks(trickName, statusName) >= 0;
	}

	private sortTricks() {
		this.tricks.sort((trick1, trick2) => {
			if (trick1.difficultyId < trick2.difficultyId) {
				return -1;				
			}

			if (trick1.difficultyId > trick2.difficultyId) {
				return 1;
			}

			if (trick1.points < trick2.points) {
				return -1;
			}

			if (trick1.points > trick2.points) {
				return 1;
			}

			if (trick1.name < trick2.name) {
				return -1;
			}

			if (trick1.name > trick2.name) {
				return 1;
			}

			return 0;
		});
	}

	private getUserTrickByIndex(index: number) {
		return this.userTricks[index];
	}

	private findIndexByUserTricks(trickName: string, statusName?: string) {
		return _.findIndex(this.userTricks, (userTrick) => {
			return userTrick.trickName == trickName && (!statusName || userTrick.statusName == statusName);
		});
	}
}