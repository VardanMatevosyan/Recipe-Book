import * as fromShoppingListReducer from '../components/shop/shopping-list/store/shopping-list.reducer';
import * as fromAuthReducer from '../auth/store/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  shoppingList: fromShoppingListReducer.ShoppingListState;
  auth: fromAuthReducer.AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingListReducer.shoppingListReducer,
  auth: fromAuthReducer.authReducer
};
