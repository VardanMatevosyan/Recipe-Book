import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../../../models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 3),
    new Ingredient('Banana', 4)
  ];
  constructor() { }

  ngOnInit() {
  }

  addShoppingList(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
