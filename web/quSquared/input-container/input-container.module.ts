import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InputContainerComponent } from './input-container.comp';

@NgModule({
	imports: [CommonModule],
	declarations: [InputContainerComponent],
	exports: [InputContainerComponent]
})

export class InputContainerModule {
}