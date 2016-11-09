import { AuthGuardSvc } from "./services/auth-guard.svc";

export const AuthProviders = [
  AuthGuardSvc
];

export const AppRoutes = [
  { path: "", redirectTo: "/sign-in", pathMatch: "full" }
];