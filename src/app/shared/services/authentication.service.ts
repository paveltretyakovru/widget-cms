import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

import { User } from '../models/user';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(
    private http: HttpClient,
    private snackBar: SnackBarComponent,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.setCurrentUserSubject();
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  setCurrentUserSubject(): void {
    const value = this.isBrowser()
      ? JSON.parse(localStorage.getItem('currentUser'))
      : {};

    this.currentUserSubject = new BehaviorSubject<User>(value);
  }

  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  login(email: string, password: string) {
    return this.http.post<any>('/api/auth', { email, password })
      .pipe(map((response) => {
        const { success, data, message } = response;
        if (success && data && data.token && this.isBrowser()) {
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.currentUserSubject.next(data);
        }
        return response;
      }));
  }

  registrate(email: string, password: string) {
    return this.http.post<any>('/api/registration', { email, password })
      .pipe(map((user) => {
        console.log('Registration completed', user);
        return user;
      }));
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }
  }
}
