import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ProfileGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var urlId = parseInt(route.paramMap.get('id'));
    var currentUser = this.auth.getCurrentUser();
    if (this.auth.isAdmin()) {
      return true
    } else if (currentUser.id == urlId) {
      return true
    } else {
      this.router.navigate(['/**'])
      return false
    }
  }

}
