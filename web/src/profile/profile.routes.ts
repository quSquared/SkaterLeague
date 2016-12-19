import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfileCreateComponent } from './profile-create/profile-create.comp';
import { ProfileEditComponent } from './profile-edit/profile-edit.comp';
import { ProfileViewComponent } from './profile-view/profile-view.comp';

const routes: Routes = [
   { path: "profile/create", component: ProfileCreateComponent },
   { path: "profile/edit", component: ProfileEditComponent },
   { path: "profile/:name/view", component: ProfileViewComponent }
];
export const ProfileRoutes: ModuleWithProviders = RouterModule.forChild(routes);