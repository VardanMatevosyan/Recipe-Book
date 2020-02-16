import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../../../models/ingredient.model';
import {ShoppingListService} from '../service/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
      }
      );

  }

}
