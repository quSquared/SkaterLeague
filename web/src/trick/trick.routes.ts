import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FlipTrickComponent } from "./flip-trick/flip-trick.comp";

const routes: Routes = [
  { path: "tricks/flip", component: FlipTrickComponent },
];
export const TrickRoutes: ModuleWithProviders = RouterModule.forChild(routes);