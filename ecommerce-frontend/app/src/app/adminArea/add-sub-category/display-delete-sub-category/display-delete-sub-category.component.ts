import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SubcategoriesService } from '../../../core/services/subcategories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-delete-sub-category',
  imports: [CommonModule],
  templateUrl: './display-delete-sub-category.component.html',
  styleUrl: './display-delete-sub-category.component.css'
})
export class DisplayDeleteSubCategoryComponent implements OnInit {
  constructor(private http: HttpClient, private _subcategoriesS:SubcategoriesService){}
  
  subCategories: any[] = [];
  totalSubCategories: number = 0;
  activeSubCategories: number = 0;
  subCategoriesWithProducts: number = 0;

  ngOnInit(): void {
    this.displaySubCategories(); 
  }

  displaySubCategories(){
    this._subcategoriesS.displaySubCategories().subscribe({
      next: (res: any) => {
        this.subCategories = res.data;
        this.calculateStats();
      },
      error: (err) => console.error('Error fetching SubCategories', err)
    });
  }

  calculateStats() {
    this.totalSubCategories = this.subCategories.length;
    this.activeSubCategories = this.subCategories.filter(sub => sub.isActive !== false).length;
    this.subCategoriesWithProducts = this.subCategories.filter(sub => sub.productCount > 0).length;
  }

  deleteSubCategory(id: string){
    this._subcategoriesS.deleteSubCategories(id).subscribe({
      next: (res:any) =>{
        console.log('SubCategory deleted successfully');
        this.displaySubCategories();
      },
      error: (err) => {
        console.error('Error deleting subcategory:', err);
      }
    })
  }
}
