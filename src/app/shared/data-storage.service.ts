import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import {map, tap, exhaustMap, take} from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn:'root'})
export class DataStorageService{
  constructor(private http: HttpClient, private recipeService : RecipeService,
    private authService : AuthService){}

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http
    .put('https://ng-course-recipe-book-59924.firebaseio.com/recipes.json', recipes,
    {
      headers : new HttpHeaders({"Access-Control-Allow-Origin":"*"})
    })
    .subscribe(response =>
      {
        console.log(response);
      });
  }

  fetchRecipes(){
    console.log('called fetch recipe')
    return this.http
    .get<Recipe[]>('https://ng-course-recipe-book-59924.firebaseio.com/recipes.json').pipe(
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients : recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    tap(recipes => {
      this.recipeService.setRecipes(recipes);
    }));

  }

}
