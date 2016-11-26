import {Provider} from '@angular/core';

import { ButtonComponent } from './button/button.comp';
import { FlexRowDirective, FlexColumnDirective, FlexAlignDirective } from './layout/flex/flex.dir';
import { LinkComponent } from './link/link.comp';
import { InputContainerComponent } from './input-container/input-container.comp';

export const quSquaredProvider: Provider[] = [
	ButtonComponent,
	FlexAlignDirective,
  FlexColumnDirective,
	FlexRowDirective,	
	LinkComponent,
	InputContainerComponent
];