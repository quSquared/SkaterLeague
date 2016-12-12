import {Provider} from '@angular/core';

import { ButtonComponent } from './button/button.comp';
import { FlexRowDirective, FlexColumnDirective, FlexAlignDirective, FlexDirective } from './layout/flex/flex.dir';
import { LinkComponent } from './link/link.comp';
import { InputContainerComponent } from './input-container/input-container.comp';
import { NavBarComponent } from './nav-bar/nav-bar.comp';
import { SideNavComponent } from './side-nav/side-nav.comp';

export const quSquaredProvider: Provider[] = [
	ButtonComponent,
	FlexAlignDirective,
  FlexColumnDirective,
	FlexRowDirective, 
	FlexDirective,
	InputContainerComponent,	
	LinkComponent,
	NavBarComponent,
	SideNavComponent
];