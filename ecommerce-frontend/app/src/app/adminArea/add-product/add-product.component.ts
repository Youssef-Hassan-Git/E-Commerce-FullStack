import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddproductService } from '../../core/services/addproduct.service';
import { BrandsService } from '../../core/services/brands.service';
import { CategoriesService } from '../../core/services/categories.service';
import { SubcategoriesService } from '../../core/services/subcategories.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

  constructor(private http: HttpClient, private _addS: AddproductService, private _brandsS:BrandsService, private _categoriesS: CategoriesService, private _subCategoriesS: SubcategoriesService) {}
  
  
  ngOnInit(): void {
        this.displayBrands(); 
        this.displayCategories();   
        this.displaySubCategories();
  }

  
  msg = '';
  errMsg = '';

  addProductForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    desc: new FormControl('', Validators.required),
    brandName: new FormControl('', Validators.required),
    categoryName: new FormControl('', Validators.required),
    subCategoryName: new FormControl('', Validators.required),
    stock: new FormControl('', [Validators.required, Validators.min(0)]),
    imgURL: new FormControl(null, Validators.required)  
  });

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addProductForm.patchValue({ imgURL: file });
    }
  }

    brands: any[] = [];
  displayBrands(){
    this._brandsS.displayBrands().subscribe({
      next: (res: any) => {
        this.brands = res.data;

      },
      error: (err) => console.error('Error fetching Brands', err)
    });
  }


    categories: any[] = [];
  displayCategories(){
    this._categoriesS.displayCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data;

      },
      error: (err) => console.error('Error fetching categories', err)
    });
  }


    subCategories: any[] = [];
  displaySubCategories(){
    this._subCategoriesS.displaySubCategories().subscribe({
      next: (res: any) => {
        this.subCategories = res.data;

      },
      error: (err) => console.error('Error fetching subcategories', err)
    });
  }


  addProduct() {

    const formData = new FormData();
    formData.append("name", this.addProductForm.get('name')?.value);
    formData.append("price", this.addProductForm.get('price')?.value);
    formData.append("desc", this.addProductForm.get('desc')?.value);
    formData.append("brandName", this.addProductForm.get('brandName')?.value);
    formData.append("categoryName", this.addProductForm.get('categoryName')?.value);
    formData.append("subCategoryName", this.addProductForm.get('subCategoryName')?.value);
    formData.append("stock", this.addProductForm.get('stock')?.value);
    formData.append("img", this.addProductForm.get('imgURL')?.value);  

    this._addS.addProduct(formData).subscribe({
      next: (res)=> {
        this.msg = res.message;
        this.errMsg = "";
        this.addProductForm.reset();
        
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
    });

 
  }



}
