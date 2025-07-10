import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../core/services/brands.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-delete-brand',
  imports: [CommonModule],
  templateUrl: './display-delete-brand.component.html',
  styleUrl: './display-delete-brand.component.css'
})
export class DisplayDeleteBrandComponent implements OnInit {
  constructor(private http: HttpClient, private _brandsS:BrandsService){}
  
  brands: any[] = [];
  totalBrands: number = 0;
  activeBrands: number = 0;
  popularBrands: number = 0;

  ngOnInit(): void {
    this.displayBrands(); 
  }

  displayBrands(){
    this._brandsS.displayBrands().subscribe({
      next: (res: any) => {
        this.brands = res.data;
        this.calculateStats();
      },
      error: (err) => console.error('Error fetching Brands', err)
    });
  }

  calculateStats() {
    this.totalBrands = this.brands.length;
    this.activeBrands = this.brands.filter(brand => brand.isActive !== false).length;
    this.popularBrands = this.brands.filter(brand => brand.productCount > 0).length;
  }

  deleteBrand(id: string){
    this._brandsS.deleteBrand(id).subscribe({
      next: (res:any) =>{this.displayBrands()},
      error: (err) => console.log(err)
    })
  }
}
