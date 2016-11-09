import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

import { BackendService } from "./backend.svc";

@Injectable()
export class AuthGuardSvc implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    if (BackendService.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(["/home"]);
      return false;
    }
  }
}