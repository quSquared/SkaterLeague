import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from './home.comp';

const routes: Routes = [
   { path: "home", component: HomeComponent }
];
export const HomeRoutes: ModuleWithProviders = RouterModule.forChild(routes);