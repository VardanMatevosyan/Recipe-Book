import {User} from '../user.moderl';
import * as fromAuthActions from './auth.actions';

export interface AuthState {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer(
  state: AuthState = initialState,
  action: fromAuthActions.AuthActions) {
  switch (action.type) {
    case fromAuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate);
      return {
        ...state,
        authError: null,
        loading: false,
        user: user
      };
    case fromAuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    case fromAuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case fromAuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
        authError: action.payload
      };
    default:
      return state;
  }
}
