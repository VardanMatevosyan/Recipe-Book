import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthResponseModel} from './auth-response-model';
import {catchError, tap} from 'rxjs/operators';
import {User} from './user.moderl';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Store} from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';
import * as fromAuthActions from './store/auth.actions';

@Injectable({providedIn: 'root'})
export class AuthService {
  private tokenExpirationTime: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromAppReducer.AppState>) {
  }

  signUp(email: string, password: string): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleErrorResponse),
        tap(resData => {
          this.handleAuthentication(resData);
        })
      );
  }

  login(email: string, password: string): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleErrorResponse),
        tap(resData => {
          this.handleAuthentication(resData);
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.store.dispatch(new fromAuthActions.LoginAction({
        email: loadedUser.email,
        userId: loadedUser.id,
        token: loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate),
      }));
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.store.dispatch(new fromAuthActions.LogoutAction());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
    }
    this.tokenExpirationTime = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTime = setTimeout(() => {
      this.logout();
      }, expirationDuration);
  }

  private handleAuthentication(resData: AuthResponseModel) {
    const expirationInMillis: number = +resData.expiresIn * 1000;
    const expirationDate = new Date(new Date().getTime() + expirationInMillis);
    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate
    );
    this.store.dispatch(new fromAuthActions.LoginAction({
      email: resData.email,
      userId: resData.localId,
      token: resData.idToken,
      expirationDate: expirationDate
    }));
    this.autoLogout(expirationInMillis);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleErrorResponse(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
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
    return throwError(errorMessage);
  }
}
