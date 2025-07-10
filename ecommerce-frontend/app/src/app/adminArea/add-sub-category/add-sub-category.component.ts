import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SubcategoriesService } from '../../core/services/subcategories.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-add-sub-category',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-sub-category.component.html',
  styleUrl: './add-sub-category.component.css'
})
export class AddSubCategoryComponent {
  constructor(private http:HttpClient, private _subCategoriesS: SubcategoriesService, private _categoriesS:CategoriesService) { }

    addSubCategoryForm: FormGroup = new FormGroup({
    subCategoryName: new FormControl('', Validators.required),
    categoryName: new FormControl('', Validators.required)
  });

  ngOnInit(){
    this.displayCategories();
  }

  categories:any[] = [];

  displayCategories(){
    this._categoriesS.displayCategories().subscribe((res:any)=>{
      this.categories = res.data;
    })
  }

  msg=''
  errMsg = ''
  addSubCategory(){
    return this._subCategoriesS.addSubCategory(this.addSubCategoryForm.value).subscribe({
      next: (res)=> {
        this.msg = res.message;
        this.errMsg = "";
        this.addSubCategoryForm.reset();
        
        setTimeout(() => {
          this.msg = "";
        }, 3000); 
             
      },
      error: (err) => { 
        this.msg = "";
        this.errMsg = err.error.message;
        
        setTimeout(() => {
          this.errMsg = "";
        }, 3000);
      }

    })
}

}