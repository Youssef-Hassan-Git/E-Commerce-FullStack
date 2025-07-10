import { Component, OnInit } from '@angular/core';
import { MyProductsService } from '../../../core/services/my-products.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrandsService } from '../../../core/services/brands.service';
import { CategoriesService } from '../../../core/services/categories.service';
import { SubcategoriesService } from '../../../core/services/subcategories.service';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  id="";

  constructor( private _productsS: MyProductsService, private http: HttpClient,private _activatedRoute: ActivatedRoute, private _brandsS: BrandsService, private _categoriesS: CategoriesService, private _subCategoriesS: SubcategoriesService){}
  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params['id'];
    this.displayBrands(); 
    this.displayCategories();   
    this.displaySubCategories();
  }

  msg = '';
  errMsg = '';

  editProductForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    desc: new FormControl('', Validators.required),
    brandName: new FormControl('', Validators.required),
    categoryName: new FormControl('', Validators.required),
    subCategoryName: new FormControl('', Validators.required),
    stock: new FormControl('', [Validators.required, Validators.min(0)]),
    imgURL: new FormControl(null)  
  });

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editProductForm.patchValue({ imgURL: file });
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

  editProduct(){
    const formData = new FormData();
    formData.append("name", this.editProductForm.get('name')?.value);
    formData.append("price", this.editProductForm.get('price')?.value);
    formData.append("desc", this.editProductForm.get('desc')?.value);
    formData.append("brandName", this.editProductForm.get('brandName')?.value);
    formData.append("categoryName", this.editProductForm.get('categoryName')?.value);
    formData.append("subCategoryName", this.editProductForm.get('subCategoryName')?.value);
    formData.append("stock", this.editProductForm.get('stock')?.value);
    
    const imageFile = this.editProductForm.get('imgURL')?.value;
    if (imageFile) {
      formData.append("img", imageFile);
    }

    this._productsS.editProduct(this.id, formData).subscribe({
         next: (res) => {
        this.errMsg = '';
        this.msg = res.message ;
        this.editProductForm.reset(); 
      },
      error: (error) => {
        this.msg = '';
        this.errMsg = error.message;
      }
    })

    this.editProductForm.reset({
      name: '',
      price: '',
      desc: '',
      brandName: '',
      categoryName: '',
      subCategoryName: '',
      stock: '',
      imgURL: null
    }); 
  }
}
