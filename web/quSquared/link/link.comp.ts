import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'qu-link',
	templateUrl: './link.html'
})
export class LinkComponent {
	@Input() quHref? : string;

	constructor() {
	}
}
