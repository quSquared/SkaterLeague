import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'qu-input-container',
	templateUrl: './input-container.html',
	styles: [ `
	* { box-sizing:border-box; }
	
	.qu-input-container {
		position:relative; 
		margin-bottom:10px;
	} 
	
	.qu-input-container ::content >>> input {
		font-size:18px;
		padding:8px 10px 7px 5px;
		display:block;
		width:calc(100% - 19px);
	}
	.qu-input-container ::content >>> input:focus 		{ outline:none; }

	/* LABEL ======================================= */
	.qu-input-container label 				 {
		color:#999; 
		font-size:18px;
		font-weight:normal;
		position:absolute;
		pointer-events:none;
		left:5px;
		top:10px;
		transition:0.2s ease all; 
		-moz-transition:0.2s ease all; 
		-webkit-transition:0.2s ease all;
	}

	/* active state */
	.qu-input-container ::content >>> input:focus ~ label, .qu-input-container ::content >>> input:valid ~ label 		{
		top:-15px;
		font-size:14px;
		color:#607d8b;
	}

	/* BOTTOM BARS ================================= */
	.bar 	{ position:relative; display:block; width:calc(100%); }
	.bar:before, .bar:after 	{
		content:'';
		height:2px; 
		width:0;
		bottom:1px; 
		position:absolute;
		background:#607d8b; 
		transition:0.2s ease all; 
		-moz-transition:0.2s ease all; 
		-webkit-transition:0.2s ease all;
	}
	.bar:before {
		left:50%;
	}
	.bar:after {
		right:50%; 
	}

	/* active state */
	.qu-input-container ::content >>> input:focus ~ .bar:before, .qu-input-container ::content >>> input:focus ~ .bar:after {
		width:50%;
	}		

	/* HIGHLIGHTER ================================== */
	.highlight {
		position:absolute;
		height:60%; 
		width:100px; 
		top:25%; 
		left:0;
		pointer-events:none;
		opacity:0.5;
	}

	/* active state */
	.qu-input-container ::content >>> input:focus ~ .highlight {
		-webkit-animation:inputHighlighter 0.3s ease;
		-moz-animation:inputHighlighter 0.3s ease;
		animation:inputHighlighter 0.3s ease;
	}

	/* ANIMATIONS ================ */
	@-webkit-keyframes inputHighlighter {
		from { background:#607d8b; }
		to 	{ width:0; background:transparent; }
	}
	@-moz-keyframes inputHighlighter {
		from { background:#607d8b; }
		to 	{ width:0; background:transparent; }
	}
	@keyframes inputHighlighter {
		from { background:#607d8b; }
		to 	{ width:0; background:transparent; }
	}
	`]
})
export class InputContainerComponent {
	@Input('placeholder') label: string;

	constructor() {
	}

	ngOnInit() {

	}
}