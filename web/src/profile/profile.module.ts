import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule }  from '@angular/common';

import { QuSquaredModule } from '../../quSquared';

import { ProfileRoutes } from './profile.routes';
import { ProfileCreateComponent } from './profile-create/profile-create.comp';
import { ProfileEditComponent } from './profile-edit/profile-edit.comp';
import { ProfileViewComponent } from './profile-view/profile-view.comp';

@NgModule({
  imports: [
    CommonModule,
		FormsModule,
		ProfileRoutes,
		QuSquaredModule
  ],
  declarations: [
		ProfileCreateComponent,
		ProfileEditComponent,
		ProfileViewComponent
  ]
})
export class ProfileModule { }