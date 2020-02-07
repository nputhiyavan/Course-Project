import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('inputName',{static: true}) inputNameRef : ElementRef;
  @ViewChild('inputAmount',{static: true}) inputAmountRef : ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor(private slService : ShoppingListService) { }

  ngOnInit() {
  }
  onAdd(){
    const ingName = this.inputNameRef.nativeElement.value;
    const ingAmount = this.inputAmountRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName,ingAmount);
    this.slService.onIngredientAdded(newIngredient);
  }
}
