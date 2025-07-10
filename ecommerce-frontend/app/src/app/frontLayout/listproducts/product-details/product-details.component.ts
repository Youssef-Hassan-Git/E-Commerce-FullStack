import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MyProductsService } from '../../../core/services/my-products.service';
import { CartService } from '../../../core/services/cart.service';
import { FavService } from '../../../core/services/fav.service';
import { OrdersService } from '../../../core/services/orders.service';

@Component({  
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
    constructor(private _route: ActivatedRoute, private _productsS: MyProductsService, private _cartS: CartService, private _favS: FavService, private _router: Router, private _ordersS: OrdersService) {}

    id: string = '';
    product: any;
    relatedProducts: any[] = [];  

    ngOnInit(): void {
      this.getId();
    }

    getId(){
        this._route.params.subscribe(params => { 
          this.id = params['id']; 
          if (this.id) {
            this.getProductById(this.id);
            this.getRelatedProducts(this.id);
          }
        });
    }

    getProductById(id: string){
        this._productsS.getProductById(id).subscribe({
          next: (res: any) => {
            this.product = res.data;
          },
          error: (err: any) => {
            console.log(err);
          }
        });
    }

    getRelatedProducts(id: string){
      this._productsS.getRelatedProducts(id).subscribe({
        next: (res: any) => {
          this.relatedProducts = res.data;
        },
        error: (err: any) => {
          console.log(err);
        }
      });

    }

    cartMsg: string = '';
    addToCart(id: string){
      this._cartS.addToCart(id).subscribe({
        next: (res: any) => {
          this.cartMsg = res.message;
          setTimeout(() => {
            this.cartMsg = '';
          }, 5000);
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }

    favMsg: string = '';
    addToFav(id: string){
      this._favS.addToFav(id).subscribe({
        next: (res: any) => {
          this.favMsg = res.message;
          setTimeout(() => {
            this.favMsg = '';
          }, 5000);
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }

    getImageUrl(imgPath: string): string {
      if (!imgPath) return '';
      const normalizedPath = imgPath.replace(/\\/g, '/');
      return `http://localhost:3000/${normalizedPath}`;
    }
}
