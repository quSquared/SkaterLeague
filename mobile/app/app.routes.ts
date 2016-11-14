import { AuthGuardSvc } from "./services";

export const AuthProviders = [
  AuthGuardSvc
];

export const AppRoutes = [
  { path: "", redirectTo: "/sign-in", pathMatch: "full" }
];