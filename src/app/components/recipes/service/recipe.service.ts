import {Injectable} from '@angular/core';
import {Recipe} from '../../../models/recipe.model';
import {Ingredient} from '../../../models/ingredient.model';
import {ShoppingListService} from '../../shop/service/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Big FAT Burger',
      'Super set of fat burgers',
      'data:image/jpeg;base64,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',
      [
        new Ingredient('Meet', 2),
        new Ingredient('Tomato', 2),
        new Ingredient('Cheese', 2),
        new Ingredient('Napa cabbage', 2)
      ]),
    new Recipe('Potato Wedges',
      'Potato Wedges as at Home, 300g',
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQTEBIRExIVFRMWFRUXFRcYFxYXFxMWFRMXFhYYGBUYHigiGBonJxgWITEhJSorLjouFx8zODMsNygtLisBCgoKDg0OGxAQGy0lICYtNS0vLy0tLS8vMy0tLS0vLy0vLy0vLS0tLzUtLS0tLS0tLS0tLTUtLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUCAwYBB//EADsQAAEDAgQEBAMGBgEFAQAAAAEAAhEDIQQFEjEGQVFhEyJxgZGhsRQyQmLB8AcjUpLR4XIWMzSC8RX/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAgMEAQUG/8QAMhEBAAICAQMCBAUDAwUAAAAAAAECAxEhBBIxBUETIlGBMmFxkfCh0eEUQsEjM1Kx8f/aAAwDAQACEQMRAD8A+4oCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgINOIxLWRPNVZM1Meu5OmObeGdOqHbGVOt625iUZrMeWak4ICAgICAgICAgICAgICAgICAgICAgICAgICCmzWpFS/KF4/X31dt6eu6q6vjHBpcyQ7ksPx7VibV8tNcUTOreESpxDiRTLXBmsixG479JU59UzxTUxG1kdFgm243pK4Z4kmKFefFAJDtw9s/ULf0fXxakRk8s3VdHqe+nh1FOqHbEFelW9beJefNZjy9c4DcgLszEeSImfDJdcEBAQEBAQEBAQEBAQEBBz+K4oax8aC5g3cDy6wvNt6lSLaiOG+vQWtXe+V7Qqh7WvaZa4Ag9QV6NbRaNww2rNZ1L2o8AEkwBuTyS1orG58ERMzqEenmNJxgPHvb6qivVYbTqLQsnBkjzCSDOy0RO1TCpWa37zgPUgKM2rXzKUVmfENQx9KY8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',
      [
        new Ingredient('Potato', 5),
        new Ingredient('Parsley', 2),
        new Ingredient('Green onions', 1),
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}

