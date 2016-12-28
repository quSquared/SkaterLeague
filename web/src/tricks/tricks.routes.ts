import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TrickResolver } from './trick/trick.resolve';
import { TrickComponent } from "./trick/trick.comp";

const routes: Routes = [
	{
		path: "tricks", component: TrickComponent,
		resolve: {
			userTricks: TrickResolver
		}
	},
];
export const TricksRoutes: ModuleWithProviders = RouterModule.forChild(routes);