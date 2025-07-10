import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyProductsService } from '../../core/services/my-products.service';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrdersService } from '../../core/services/orders.service';
import { FavService } from '../../core/services/fav.service';
import { TopSalesService } from '../../core/services/top-sales.service';
import { CategoriesService } from '../../core/services/categories.service';
import { SubcategoriesService } from '../../core/services/subcategories.service';
import { BrandsService } from '../../core/services/brands.service';

@Component({
  selector: 'app-listproducts',
  imports: [CommonModule, FormsModule],
  templateUrl: './listproducts.component.html',
  styleUrl: './listproducts.component.css'
})
export class ListproductsComponent implements OnInit {
  products: any[] = [];
  allProducts: any[] = [];
  pagination: any = {};
  topSales: any[] = [];
  myCartMsgSuccess: string = '';
  myFavMsgSuccess: string = '';



  constructor(private _productsS: MyProductsService, private _router: Router, private _cartS: CartService, private _ordersS: OrdersService, private _favS: FavService, private _topSalesS: TopSalesService, private _categoriesS: CategoriesService, private _subCategoriesS: SubcategoriesService, private   _brandsS: BrandsService) {}
  
  ngOnInit(){
    this.getMyProducts();
    this.getTopSales();
  }

  getMyProducts(){
    this._productsS.displayMyProducts(this.pagination.page, 6).subscribe({
      next: (res: any) => {
        this.allProducts = res.data;
        this.products = res.data;
        this.pagination = res.pagination;
        this.extractFilterOptions();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }



  extractFilterOptions() {
    // Extract brands
    this.brands = this.allProducts
      .map(p => p.brandId?.brandName)
      .filter(name => name)
      .filter((name, index, array) => array.indexOf(name) === index)
      .sort();

    // Extract categories  
    this.categories = this.allProducts
      .map(p => p.categoryId?.categoryName)
      .filter(name => name)
      .filter((name, index, array) => array.indexOf(name) === index)
      .sort();

    this.subcategories = this.allProducts
      .map(p => p.subCategoryId?.subCategoryName)
      .filter(name => name)
      .filter((name, index, array) => array.indexOf(name) === index)
      .sort();
  }

  getProductById(id: string){
    this._router.navigate(['/products', id]);
  }

  nextPage(){
    if (this.pagination.page < this.pagination.totalPages) {
      this.pagination.page++;
      this.getMyProducts();
    }
  }
  
  getImageUrl(imgPath: string): string {
    if (!imgPath) return '';
    const normalizedPath = imgPath.replace(/\\/g, '/');
    return `http://localhost:3000/${normalizedPath}`;
  }
  
  previousPage(){
    if (this.pagination.page > 1) {
      this.pagination.page--;
      this.getMyProducts();
    }
  }

  addToCart(id: string){ 
    this._cartS.addToCart(id).subscribe({
      next: (res: any) => {
        this.myCartMsgSuccess = res.message;
        setTimeout(() => {
          this.myCartMsgSuccess = '';
        }, 5000);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addToFav(id: string){
    this._favS.addToFav(id).subscribe({
      next: (res: any) => {
        this.myFavMsgSuccess = res.message;
        setTimeout(() => {
          this.myFavMsgSuccess = '';
        }, 5000);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

    // Filter properties
    brands: string[] = [];
    categories: string[] = [];
    subcategories: string[] = [];
    selectedBrand: string = '';
    selectedCategory: string = '';
    selectedSubcategory: string = '';
    selectedPrice: number = 0;
  applyFilters(){
    this.products = this.allProducts.filter(p => {
      const category = !this.selectedCategory || p.categoryId?.categoryName === this.selectedCategory;
      const subcategory = !this.selectedSubcategory || p.subCategoryId?.subCategoryName === this.selectedSubcategory;
      const brand = !this.selectedBrand || p.brandId?.brandName === this.selectedBrand;
      const price = !this.selectedPrice || p.price <= this.selectedPrice;
      
      return category && subcategory && brand && price;
    });
  }

  clearFilters(){
    this.selectedCategory = '';
    this.selectedSubcategory = '';
    this.selectedBrand = '';
    this.selectedPrice = 0;
    this.products = this.allProducts;
  }

  hasActiveFilters(): boolean {
    return !!(this.selectedCategory || this.selectedSubcategory || this.selectedBrand || this.selectedPrice);
  }

  getTopSales(){
    this._topSalesS.getTopSales().subscribe({
      next: (res: any) => {
        this.topSales = res.data;
      },
      error: (err) => {
        console.log(err);
        }
    })
  } 
}
