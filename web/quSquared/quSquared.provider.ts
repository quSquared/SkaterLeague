import {Provider} from '@angular/core';

import { ButtonComponent } from './button/button.comp';
import { FlexRowDirective, FlexColumnDirective, FlexAlignDirective } from './layout/flex/flex.dir';
import { LinkComponent } from './link/link.comp';
import { InputContainerComponent } from './input-container/input-container.comp';
import { SideNavComponent } from './side-nav/side-nav.comp';

export const quSquaredProvider: Provider[] = [
	ButtonComponent,
	FlexAlignDirective,
  FlexColumnDirective,
	FlexRowDirective,
	InputContainerComponent,	
	LinkComponent,
	SideNavComponent
];