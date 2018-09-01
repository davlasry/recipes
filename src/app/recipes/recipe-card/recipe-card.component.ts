import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { Router } from '@angular/router';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {

  @Input() recipe: Recipe;

  @Output() deleted = new EventEmitter<boolean>();

  constructor(
    private recipesService: RecipesService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  editRecipe(id: string, event): void {
    event.stopPropagation();
    console.log(id);
    this.router.navigateByUrl(`recipes/edit/${id}`);
  }

  deleteRecipe(id, event) {
    event.stopPropagation();
    this.recipesService.deleteRecipe(id).subscribe(
      result => {
        console.log(result);
        this.deleted.emit(id);
      }
    );
  }

}
