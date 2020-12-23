import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../../../models/ingredient.model';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromAppReducer from '../../../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
import {trigger, state, style, transition, animate, group} from '@angular/animations';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('movable', [
      state('normal', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(400)
      ]),
      transition('* => void', [
        group([
          animate(100, style({
            color: 'red',
          })),
          animate(400, style({
            opacity: 0,
            transform: 'translateX(100px)'
          }))
        ])
      ])
    ])
  ]
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
