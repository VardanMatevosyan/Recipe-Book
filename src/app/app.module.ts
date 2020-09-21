import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './components/root/app.component';
import { HeaderComponent } from './components/header/header.component';
import { ShoppingListComponent } from './components/shop/shopping-list/shopping-list.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './components/recipes/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './components/recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppingEditComponent } from './components/shop/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './directives/dropdown.directive';
import {AppRoutingModule} from './app.routing.module';
import {RecipeEditComponent} from './components/recipes/recipe-edit/recipe-edit.component';
import {ShoppingListService} from './components/shop/service/shopping-list.service';
import {RecipeService} from './components/recipes/service/recipe.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ShoppingListService, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
