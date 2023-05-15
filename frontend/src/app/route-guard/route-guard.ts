import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()

export class RouteGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) { }
  
  canActivate(): boolean {
    const isAuthenticated = this.authService.getIsAuthenticated();

    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      // return false;
    }
  
    return isAuthenticated;
  }
}
