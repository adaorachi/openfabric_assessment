import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private authenticatedSub: Subscription;
  isAuthenticated: boolean = false;
  userEmail: string;
  routeSubscription: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const data = this.authService.getLocalStorageData();

        const { email, userId } = jwt_decode<{ email: string; userId: string }>(
          data?.token
        );
        this.userEmail = email?.split('@')[0];
      }
    });

    this.authenticatedSub = this.authService
      .getAuthenticatedSub()
      .subscribe((status) => {
        this.isAuthenticated = status;
      });

    this.isAuthenticated = this.authService.getIsAuthenticated();
  }

  logOut() {
    this.authService.logOutUser();
  }

  ngOnDestroy() {
    this.authenticatedSub.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
