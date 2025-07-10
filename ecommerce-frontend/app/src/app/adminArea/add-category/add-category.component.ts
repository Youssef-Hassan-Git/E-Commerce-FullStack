import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-category',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  constructor(private http:HttpClient, private _categoriesS:CategoriesService) { }

  addCategoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', Validators.required)
  });


  msg=''
  errMsg = ''
  addCategory(){
    return this._categoriesS.addCategory(this.addCategoryForm.value).subscribe({
      next: (res)=> {
        this.msg = res.message;
        this.errMsg = "";
        this.addCategoryForm.reset();
        
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
