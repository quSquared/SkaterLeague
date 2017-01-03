import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule }  from '@angular/common';

import { QuSquaredModule, FlexLayoutModule } from '../../quSquared';

import { ProfileViewService } from './profile-view/profile-view.svc';
import { ProfileViewResolver } from './profile-view/profile-view.resolve';
import { ProfileCreateComponent } from './profile-create/profile-create.comp';
import { ProfileEditComponent } from './profile-edit/profile-edit.comp';
import { ProfileViewComponent } from './profile-view/profile-view.comp';
import { ProfileRoutes } from './profile.routes';

@NgModule({
  imports: [
    CommonModule,
		FormsModule,
		ProfileRoutes,
		QuSquaredModule,
		FlexLayoutModule
  ],
  declarations: [
		ProfileCreateComponent,
		ProfileEditComponent,
		ProfileViewComponent
  ],
	providers: [
		ProfileViewService,
		ProfileViewResolver
	]
})
export class ProfileModule { }