import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ProfileViewService } from './profile-view.svc';

@Injectable()
export class ProfileViewResolver implements Resolve<any> {
  constructor(private profileViewSvc: ProfileViewService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.profileViewSvc.getByUsername(route.params['username']);
  }
}