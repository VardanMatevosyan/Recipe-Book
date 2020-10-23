import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../../../models/ingredient.model';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromAppReducer from '../../../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<fromAppReducer.AppState>) {
  }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy(): void {
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEditAction(index));
  }
}
