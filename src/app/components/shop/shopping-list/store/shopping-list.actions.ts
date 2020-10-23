import {Action} from '@ngrx/store';
import {Ingredient} from '../../../../models/ingredient.model';

export const ADD_INGREDIENT = '[Shopping List] ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[Shopping List] ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = '[Shopping List] UPDATE_INGREDIENT';
export const DELETE_INGREDIENTS = '[Shopping List] DELETE_INGREDIENTS';
export const START_EDIT = '[Shopping List] START_EDIT';
export const STOP_EDIT = '[Shopping List] STOP_EDIT';

export class AddIngredientAction implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {
  }
}

export class AddIngredientsAction implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {
  }
}

export class UpdateIngredientAction implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: Ingredient) {
  }
}

export class DeleteIngredientAction implements Action {
  readonly type = DELETE_INGREDIENTS;
}


export class StartEditAction implements Action {
  readonly type = START_EDIT;

  constructor(public index: number) {
  }
}

export class StopEditAction implements Action {
  readonly type = STOP_EDIT;
}


export type ShoppingListActions = AddIngredientAction
                                  | AddIngredientsAction
                                  | UpdateIngredientAction
                                  | DeleteIngredientAction
                                  | StartEditAction
                                  | StopEditAction;
