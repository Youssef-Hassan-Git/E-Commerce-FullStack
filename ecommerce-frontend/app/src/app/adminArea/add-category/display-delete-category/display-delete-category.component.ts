import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-delete-category',
  imports: [CommonModule],
  templateUrl: './display-delete-category.component.html',
  styleUrl: './display-delete-category.component.css'
})
export class DisplayDeleteCategoryComponent implements OnInit {
  constructor(private http: HttpClient, private _categoriesS:CategoriesService){}
  
  categories: any[] = [];
  totalCategories: number = 0;
  activeCategories: number = 0;
  categoriesWithSubs: number = 0;

  ngOnInit(): void {
    this.displayCategories(); 
  }

  displayCategories(){
    this._categoriesS.displayCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data;
        this.calculateStats();
      },
      error: (err) => console.error('Error fetching Categories', err)
    });
  }

  calculateStats() {
    this.totalCategories = this.categories.length;
    this.activeCategories = this.categories.filter(category => category.isActive !== false).length;
    this.categoriesWithSubs = this.categories.filter(category => category.subCategoryCount > 0).length;
  }

  deleteCategory(id: string){
    this._categoriesS.deleteCategory(id).subscribe({
      next: (res:any) =>{this.displayCategories()},
      error: (err) => console.log(err)
    })
  }
}
