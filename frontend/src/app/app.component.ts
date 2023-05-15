import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';
  isPublicPage: boolean = false;
  routeSubscription!: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isPublicPage = ['/login', '/register'].includes(this.router.url);

      }
    });
    this.authService.authenticatedFromLocalStorage();
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
