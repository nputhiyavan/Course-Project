import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientsAdded = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes', 10)
      ];
    getIngredients(){
        return this.ingredients.slice();
    }
    onIngredientAdded(ingredient : Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsAdded.next(this.ingredients);
      }
    getIngredient(index : number){
      return this.ingredients[index];
    }
    addIngredients(ingredients : Ingredient[]){
        // for(let ingredient of ingredients){
        //     this.ingredients.push(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsAdded.next(this.ingredients.slice());
    }
    updateIngredients(index : number,ingredient: Ingredient){
      this.ingredients[index] = ingredient;
      this.ingredientsAdded.next(this.ingredients.slice());
    }
    deleteIngredient(index : number){
      this.ingredients.splice(index,1);
      this.ingredientsAdded.next(this.ingredients.slice());
    }
}
