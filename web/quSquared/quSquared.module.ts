import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { quSquaredProvider } from './quSquared.provider';

@NgModule({
	declarations: [
		quSquaredProvider
	],
	imports: [
		RouterModule
	],
	exports: [
		quSquaredProvider
	]
})

export class QuSquaredModule {
}