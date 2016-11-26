import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'qu-side-nav',
	templateUrl: './side-nav.html'
})
export class SideNav {
	@Input() isOpen? : string;

	constructor() {
	}

	toggle() {

	}
}