import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe('Pepperoni Pizza','thin crust and thick cheese',
        'assets/pizzadownload.jpg',
        [
            new Ingredient('Cheese',1),
            new Ingredient('Flour',2)
        ])
        ,new Recipe('Fried Chicken burger','English Fried Sandwich',
        'assets/cburgerdownload.jpg',
        [
            new Ingredient('Buns', 2),
            new Ingredient('Chicken', 1)
        ])
      ];
    constructor(private slService : ShoppingListService){}


    addIngredientsToShopList(ingredients : Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    getRecipes(){
        return this.recipes;
    }
    getRecipe(id: number){
      return this.recipes[id];
    }
    addRecipe(recipe: Recipe){
      this.recipes.push(recipe);
      this.recipeChanged.next(this.recipes.slice());
    }
    updateRecipe(index: number, recipe : Recipe){
      this.recipes[index] = recipe;
      this.recipeChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number){
      this.recipes.splice(index, 1);
      this.recipeChanged.next(this.recipes.slice());
    }

}
