import {User} from '../user.moderl';
import * as fromAuthActions from './auth.actions';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null
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
        user: user
      };
    case fromAuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
