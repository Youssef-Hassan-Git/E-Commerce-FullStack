import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { FavService } from '../../../core/services/fav.service';
import { OrdersService } from '../../../core/services/orders.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  constructor(private _cartS: CartService, private _favS: FavService, private _ordersS: OrdersService, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.displayMyCart();
  }

  addressForm = new FormGroup({
    address: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  myCart: any[] = [];
  displayMyCart(){
    this._cartS.getUserCart().subscribe({
      next: (res: any) => {
        this.myCart = res.data;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  removeFromCart(id: string){
    this._cartS.removeItemFromCart({productId: id}).subscribe({
      next: (res: any) => {
        this.myCartMsgSuccess = res.message;
        this.displayMyCart();
        
        setTimeout(() => {
          this.myCartMsgSuccess = '';
        }, 3000);
    
      },
      error: (err: any) => {
        console.log('Remove error:', err);
      }
    })
  } 

  addCart: string = '';

  addToCart(id: string){
    this._cartS.addToCart(id).subscribe({
      next: (res: any) => {
        this.displayMyCart();
      
        setTimeout(() => {
          this.addCart = res.message;
  
        }, 5000);

      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  itemsQuantity(){
    let quantity = 0;
    for(let i = 0; i < this.myCart.length; i++){
      quantity += this.myCart[i].quantity;
    }
    return quantity;

  }

  itemsPrice(){
    let price = 0;
    for(let i = 0; i < this.myCart.length; i++){
      price += this.myCart[i].price ;
    }
    return price;
  }
  
  myCartMsgSuccess: string = '';
  addToFav(id: string){
    this._favS.addToFav(id).subscribe({
      next: (res: any) => {
        this.myCartMsgSuccess = res.message;
        setTimeout(() => {
          this.myCartMsgSuccess = '';
        }, 5000);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }



  myOrderMsgSuccess: string = '';
  addToOrder(){
    if (this.addressForm.valid) {
      const address = this.addressForm.get('address')?.value;
      if (address) {
        this._ordersS.addOrder(address).subscribe({
          next: (res: any) => {
            this.myOrderMsgSuccess = res.message;
            this.addressForm.reset();
            this.displayMyCart(); 
            setTimeout(() => {
              this.myOrderMsgSuccess = '';
            }, 5000);
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      }
    }
  }

  getImageUrl(imgPath: string): string {
    if (!imgPath) return '';
    const normalizedPath = imgPath.replace(/\\/g, '/');
    return `http://localhost:3000/${normalizedPath}`;
  }
}
