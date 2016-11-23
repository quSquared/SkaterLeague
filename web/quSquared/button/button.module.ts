import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from './button.comp';

@NgModule({
	imports: [CommonModule],
	declarations: [ButtonComponent],
	exports: [ButtonComponent]
})

export class ButtonModule {
}