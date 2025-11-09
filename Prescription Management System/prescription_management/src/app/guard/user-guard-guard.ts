import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth-service';



@Injectable({
  providedIn: 'root'
})

export class UserGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {

    if (this.authService.isUser()) {
      // Logged in and role is USER → allow
      return true;
    }

    // Not logged in → redirect to login
    return this.router.createUrlTree(['/login']);
  }

  //=======================================

  // constructor(
  //   private authService: AuthService,
  //   private router: Router
  // ) {}

  // canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {
  //   console.log('Checking UserGuard. Current Role:', this.authService.getUserProfileFromStorage());

  //   if (this.authService.isUser()) {
  //     return true;
  //   }

  //   return this.router.createUrlTree(['/login']);
  // }
}
