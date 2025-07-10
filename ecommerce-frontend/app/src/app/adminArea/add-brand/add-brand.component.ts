import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAddBrand } from '../../core/models/models';

@Component({
  selector: 'app-add-brand',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.css'
})
export class AddBrandComponent {

  constructor(private http: HttpClient, private _brandsS:BrandsService){}

  addBrandForm: FormGroup = new FormGroup({
    brandName: new FormControl('', Validators.required)
  });


  msg=''
  errMsg = ''
  addBrand(){
    return this._brandsS.addBrand(this.addBrandForm.value).subscribe({
      next: (res)=> {
        this.msg = res.message;
        this.errMsg = "";
        this.addBrandForm.reset();
        
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
