import { Component, ElementRef, Renderer} from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlexRowDirective } from './../layout/flex/flex.dir';

@Component({
	selector: 'qu-nav-bar',
	templateUrl: './nav-bar.html'
})
export class NavBarComponent {

	constructor(
		private elementRef: ElementRef,
		private renderer: Renderer) {
	}
}