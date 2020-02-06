import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() recipeDescriptionEvent: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  showRecipeDescriptionEventEmit() {
    this.recipeDescriptionEvent.emit();
  }

}
