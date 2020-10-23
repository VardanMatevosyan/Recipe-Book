import {Action} from '@ngrx/store';

export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';

export class LoginAction implements Action {
  readonly type = LOGIN;

  constructor(public payload: {
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }) {}

}

export class LogoutAction implements Action {
  readonly type = LOGOUT;
}

export type AuthActions = LoginAction | LogoutAction;
