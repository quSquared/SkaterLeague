import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
	selector: '[quFlexRow]'
})
export class FlexRowDirective implements OnInit {
	private element: HTMLElement;

	constructor(
		private elementRef: ElementRef,
		private renderer: Renderer
	) { 	
		this.element = this.elementRef.nativeElement;
	}

	ngOnInit () {
		this.renderer.setElementClass(this.element, 'qu-flex-row', true);
	}
}

@Directive({
	selector: '[quFlexColumn]'
})
export class FlexColumnDirective implements OnInit {
	private element: HTMLElement;

	constructor(
		private elementRef: ElementRef,
		private renderer: Renderer
	) { 	
		this.element = this.elementRef.nativeElement;
	}

	ngOnInit () {
		this.renderer.setElementClass(this.element, 'qu-flex-column', true);
	}
}

@Directive({
	selector: '[quFlexAlign]'
})
export class FlexAlignDirective implements OnInit {
	private element: HTMLElement;
	private alignItems: string[];
	
  @Input()
  set quFlexAlign(flexAlign: string) {
    this.alignItems = flexAlign.split(/\s+/);
  }

	constructor(
		private elementRef: ElementRef,
		private renderer: Renderer
	) { 	
		this.element = this.elementRef.nativeElement;
	}

	ngOnInit () {
		if (this.alignItems.length == 2) {
			this.renderer.setElementClass(this.element, `qu-flex-justify-content-${this.alignItems[0]}`, true);
			this.renderer.setElementClass(this.element, `qu-flex-align-items-${this.alignItems[1]}`, true);
		}
		else {
			this.renderer.setElementClass(this.element, `qu-flex-justify-content-${this.alignItems[0]}`, true);
		}
	}
}

@Directive({
	selector: '[quFlex]'
})
export class FlexDirective implements OnInit {
	public element: HTMLElement;  
	public flexAmount?: number;

  @Input()
  set quFlex(flexAmount: number) {
    this.flexAmount = flexAmount;
  }

	constructor(
		public elementRef: ElementRef,
		public renderer: Renderer
	) { 	
		this.element = this.elementRef.nativeElement;
	}

	ngOnInit () {
		if (this.flexAmount) {
			this.renderer.setElementStyle(this.element, 'flex', `${this.flexAmount}%`);
			this.renderer.setElementStyle(this.element, 'max-width', `${this.flexAmount}%`);
		}
		else {
			this.renderer.setElementStyle(this.element, 'flex', '1');
		}
	}
}