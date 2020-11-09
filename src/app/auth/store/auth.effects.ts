import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {AuthResponseModel} from '../auth-response-model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import * as AuthActions from './auth.actions';
import {of, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStartAction) => {
      return this.http.post<AuthResponseModel>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseApiKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        })
        .pipe(
          map(resData => {
            const expirationInMillis: number = +resData.expiresIn * 1000;
            const expirationDate = new Date(new Date().getTime() + expirationInMillis);
            return new AuthActions.LoginAction({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate: expirationDate
            });
          }),
          catchError(errorResponse => {
            let errorMessage = 'An unknown error occurred';
            if (!errorResponse.error || !errorResponse.error.error) {
              return of(new AuthActions.LoginFailAction(errorMessage));
            }
            switch (errorResponse.error.error.message) {
              case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
              case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email not found';
                break;
              case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct';
            }
            return of(new AuthActions.LoginFailAction(errorMessage));
          })
      );
    })
  );

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      this.router.navigate(['/']);
    }));
  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {
  }
}
