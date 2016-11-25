import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'qu-button',
	templateUrl: './button.html'
})
export class ButtonComponent {
	@Input() qlHref? : string;

	constructor() {
	}
}