import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MyProductsService } from '../../core/services/my-products.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {
  myproducts: any[] = [];
  pagination: any = {};

  constructor(private _getProductsS: MyProductsService, private _router:Router) {}

  ngOnInit(): void {
    this.getMyProducts();
  }

  getMyProducts(){
    this._getProductsS.displayMyProducts(this.pagination.page, this.pagination.limit ).subscribe({
      next: (res : any) => {
        this.myproducts = res.data;
        this.pagination = res.pagination;
      }
    })
  }

  previousPage() {
    if (this.pagination.page > 1) {
      this.pagination.page--;
      this.getMyProducts();
    }
  }

  nextPage() {
    if (this.pagination.page < this.pagination.totalPages) {
      this.pagination.page++;
      this.getMyProducts();
    }
  }

  editProduct(id: string): void {
      this._router.navigate(['/admin/editProduct/', id])
  }

  deleteProduct(id: string): void {
    this._getProductsS.deleteProduct(id).subscribe({
      next: ()=> {
        this.getMyProducts();
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  getImageUrl(imgPath: string): string {
    if (!imgPath) return '';
    const normalizedPath = imgPath.replace(/\\/g, '/');
    return `http://localhost:3000/${normalizedPath}`;
  }
}
