import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import User from '../models/auth';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private ROOT_URL = `${env.baseURL}/users`;
  private token: string;
  private authenticatedSub = new Subject<boolean>();
  private isAuthenticated: boolean = false;
  private logOutTimer: any;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private notifier: NotifierService,
    private router: Router
  ) {}

  getToken() {
    return this.token;
  }

  getAuthenticatedSub() {
    return this.authenticatedSub.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  authInUser(payload: User, isLoginPage: boolean) {
    const isLogin = isLoginPage;
    const endpoint = isLogin ? 'login' : 'sign-up';

    return this.http
      .post<{
        userEmail: string;
        token: string;
        expiresIn: number;
      }>(`${this.ROOT_URL}/${endpoint}`, payload, this.httpOptions)
      .subscribe(
        (res) => {
          this.token = res.token;
          if (this.token) {
            this.authenticatedSub.next(true);
            this.isAuthenticated = true;

            this.logOutTimer = setTimeout(() => {
              this.logOutUser();
            }, res.expiresIn * 1000);

            const now = new Date();
            const expiresDate = new Date(now.getTime() + res.expiresIn * 1000);

            this.storeLoginDetails(this.token, expiresDate);

            this.showNotification(
              'success',
              `User successfully ${isLogin ? 'logged in' : 'registered'}!`
            );
            this.router.navigate(['/']);
          }
        },
        (error) => {
          this.showNotification(
            'error',
            `${JSON.stringify(error?.error?.message)}`
          );
        }
      );
  }

  logOutUser() {
    this.token = '';
    this.isAuthenticated = false;
    this.authenticatedSub.next(false);
    this.router.navigate(['/']);
    clearTimeout(this.logOutTimer);
    this.clearLoginDetails();

    this.showNotification('success', 'User successfully logged out');
  }

  storeLoginDetails(token: string, expirationDate: Date) {
    const obj = {
      token,
      expiresIn: expirationDate.toISOString(),
    };
    localStorage.setItem('onShopToken', JSON.stringify(obj));
  }

  clearLoginDetails() {
    localStorage.removeItem('onShopToken');
  }

  getLocalStorageData() {
    const data = localStorage.getItem('onShopToken');

    const { token, expiresIn } = JSON.parse(data || '{}');

    if (!token || !expiresIn) {
      return;
    }

    return {
      token,
      expiresIn: new Date(expiresIn),
    };
  }

  authenticatedFromLocalStorage() {
    const locaStorageData = this.getLocalStorageData();
    if (locaStorageData) {
      const now = new Date();
      const expiresIn = locaStorageData.expiresIn.getTime() - now.getTime();

      if (expiresIn > 0) {
        this.token = locaStorageData.token;
        this.isAuthenticated = true;
        this.authenticatedSub.next(true);
        this.logOutTimer?.setTimeout(expiresIn / 1000);
      }
    }
  }

  private showNotification(type: string, message: string) {
    this.notifier.notify(type, message);
  }
}
