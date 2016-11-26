import { NgModule } from '@angular/core';

import { quSquaredProvider } from './quSquared.provider';

@NgModule({
	declarations: [
		quSquaredProvider
	],
	exports: [
		quSquaredProvider
	]
})

export class QuSquaredModule {
}