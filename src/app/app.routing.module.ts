import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from './components/shop/shopping-list/shopping-list.component';
import {RecipesComponent} from './components/recipes/recipes.component';
import {RecipeDetailComponent} from './components/recipes/recipe-detail/recipe-detail.component';
import {RecipeStartComponent} from './components/recipes/recipe-start/recipe-start.component';
import {RecipeEditComponent} from './components/recipes/recipe-edit/recipe-edit.component';
import {RecipeResolverService} from './components/recipes/recipe-resolver.service';
import {AuthComponent} from './auth/auth.component';

const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]}
    ]},
  {path: 'shoppingList', component: ShoppingListComponent},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
