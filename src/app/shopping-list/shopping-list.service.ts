import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    ingredientsAdded = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes', 10)
      ];
    getIngredients(){
        return this.ingredients.slice();
    }
    onIngredientAdded(ingredient : Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsAdded.emit(this.ingredients);
      }
    addIngredients(ingredients : Ingredient[]){
        // for(let ingredient of ingredients){
        //     this.ingredients.push(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsAdded.emit(this.ingredients.slice());
    }
}