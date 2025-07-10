import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../../core/services/categories.service';

@Component({
  selector: 'app-display-categories',
  imports: [CommonModule],
  templateUrl: './display-categories.component.html',
  styleUrl: './display-categories.component.css'
})
export class DisplayCategoriesComponent implements OnInit {
  constructor(private _categoriesS: CategoriesService){}

  ngOnInit(): void {
    this.displayCategories();
  }

  categories: any[] = [];

  displayCategories(){
    this._categoriesS.displayCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
