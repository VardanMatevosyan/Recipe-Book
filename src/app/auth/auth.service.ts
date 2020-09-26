import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthResponseModel} from './auth-response-model';
import {catchError} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9LnZWDn6UqOQnW8_Wp6LKaqYeDm2CFA4',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleErrorResponse));
  }

  login(email: string, password: string): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9LnZWDn6UqOQnW8_Wp6LKaqYeDm2CFA4',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleErrorResponse));
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
