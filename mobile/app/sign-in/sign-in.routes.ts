
import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SignInComponent } from "./sign-in.comp";

const routes: Routes = [
  { path: "sign-in", component: SignInComponent },
];
export const SignInRoutes: ModuleWithProviders = RouterModule.forChild(routes);