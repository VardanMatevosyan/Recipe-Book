import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeDescriptionEvent: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is description', 'https://storage.needpix.com/rsynced_images/dessert-2508853_1280.jpg'),
    new Recipe('A test 2 recipe', 'This is description 2', 'https://storage.needpix.com/rsynced_images/dessert-2508853_1280.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

  emitRecipeDescriptionEvent(recipeElement: Recipe) {
    this.recipeDescriptionEvent.emit(recipeElement);
  }

}
