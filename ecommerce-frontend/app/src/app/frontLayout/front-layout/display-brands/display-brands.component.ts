import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsService } from '../../../core/services/brands.service';  

@Component({
  selector: 'app-display-brands',
  imports: [CommonModule],
  templateUrl: './display-brands.component.html',
  styleUrl: './display-brands.component.css'
})
export class DisplayBrandsComponent implements OnInit {
  constructor(private _brandsS: BrandsService){}

  ngOnInit(): void {
    this.displayBrands();
  }

  brands: any[] = [];

  displayBrands(){
    this._brandsS.displayBrands().subscribe({ 
      next: (res: any) => {
        this.brands = res.data;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}

