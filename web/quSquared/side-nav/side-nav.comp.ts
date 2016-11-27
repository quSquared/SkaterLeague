import { Component, Input, ElementRef, Renderer} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'qu-side-nav',
	templateUrl: './side-nav.html'
})
export class SideNavComponent {
	@Input() isOpen: boolean = false;

	constructor(
		private elementRef: ElementRef,
		private renderer: Renderer) {
	}
}