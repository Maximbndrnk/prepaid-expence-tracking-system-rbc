import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError, from } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { SessionStorageService } from '../shared/services/session-storage.service';
import { KEYS } from '../shared/models/keys.const';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  constructor(
    private authService: AuthService,
    private sessionStorage: SessionStorageService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    // Get the access token from the local storage
    const accessToken = this.sessionStorage.getItem(KEYS.ACCESS_TOKEN);

    // If there is an access token, add it to the request headers
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    // Continue with the request and handle any errors
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        // If the error is an unauthorized error, try to update the access token
        if (error.status === 401 && accessToken) {
          return from(this.authService.updateToken()).pipe(
            switchMap(() => {

              // Get the new access token from the local storage
              const newAccessToken = this.sessionStorage.getItem(KEYS.ACCESS_TOKEN);

              // Add the new access token to the request headers
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`
                }
              });

              // Retry the original request with the new access token
              return next.handle(request);
            }),
            catchError(err => {
              // Log the error and return the original error
              console.error(err);
              return throwError(error);
            })
          );
        }

        // If the error is not an unauthorized error, return the error
        return throwError(error);
      })
    );
  }
}
