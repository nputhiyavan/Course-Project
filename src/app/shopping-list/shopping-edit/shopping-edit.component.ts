import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('inputName',{static: true}) inputNameRef : ElementRef;
  // @ViewChild('inputAmount',{static: true}) inputAmountRef : ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  subsciption: Subscription;
  editMode = false;
  editedItemIndex : number;
  editedItem: Ingredient;
  @ViewChild('f',{static: false}) slForm: NgForm;
  constructor(private slService : ShoppingListService) { }

  ngOnInit() {
    this.subsciption = this.slService.startedEditing
    .subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue(
          {
            name: this.editedItem.name,
            amount: this.editedItem.amount
          }
        )
      }
    )
  }

  ngOnDestroy() {
    this.subsciption.unsubscribe();
  }
  onSubmit(form : NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngredients(this.editedItemIndex, newIngredient);
    }
    else{
      this.slService.onIngredientAdded(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
