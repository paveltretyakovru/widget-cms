import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { catchError } from 'rxjs/operators';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
		private authenticationService: AuthenticationService,
		private snackBar: SnackBarComponent
	) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((err) => {
      if (err.status === 401) {
        this.authenticationService.logout();
        location.reload(true);
      }

      const error = err.error.message || err.statusText;
			this.snackBar.open(error, '');

      return throwError(error);
    }));
  }
}

