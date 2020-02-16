import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from '../../../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is description', 'https://storage.needpix.com/rsynced_images/dessert-2508853_1280.jpg'),
    new Recipe('A test 2 recipe', 'This is description 2', 'https://storage.needpix.com/rsynced_images/dessert-2508853_1280.jpg')
  ];

  constructor() { }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
}

