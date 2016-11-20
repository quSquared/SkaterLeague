import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SignUpComponent } from "./sign-up.comp";

const routes: Routes = [
  { path: "sign-up", component: SignUpComponent },
];
export const SignUpRoutes: ModuleWithProviders = RouterModule.forChild(routes);