import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthRouteGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    |boolean
    |UrlTree
    |Observable<boolean | UrlTree>
    |Promise<boolean | UrlTree> {

    const userData = this.authService.currentUser.getValue();
    if (userData && userData.userId) {
      if (state.url.indexOf('/auth/signIn') > -1) {
        this.route.navigate(['/sport-fields']);
        return false;
      }
    }
    else{
        if(state.url.indexOf("sport-fields")> -1)
        {
          this.route.navigate(['/auth/signIn']);
          return false;
        }
    }
  return true;
  }

}
