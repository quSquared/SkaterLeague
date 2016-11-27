import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'qu-input-container',
	templateUrl: './input-container.html'
})
export class InputContainerComponent {
	@Input('placeholder') label: string;

	constructor() {
	}

	ngOnInit() {

	}
}