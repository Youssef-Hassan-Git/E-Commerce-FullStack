import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavService } from '../../../core/services/fav.service';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favs',
  imports: [CommonModule, RouterLink],
  templateUrl: './favs.component.html',
  styleUrl: './favs.component.css'
})
export class FavsComponent implements OnInit{
constructor(private _http:HttpClient , private _favs: FavService, private _addCart: CartService){}
ngOnInit(): void {
  this.displayMyFavs();
}

myFavs: any [] = [];
displayMyFavs(){
  return this._favs.getUserFav().subscribe({
    next: (res)=>{
      this.myFavs = res.data;
      console.log(this.myFavs);
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

deleteFavProduct(id:string){
  
  return this._favs.removeItemFromFav(id).subscribe({
    next: (res)=>{
      this.myFavs = this.myFavs.filter(fav => fav.product._id !== id);
      this.displayMyFavs();
  },
    error: (err) => {
      console.log(err);

    }
  })
}

myMsg = ''
addToCart(id:string){
  return this._addCart.addToCart(id).subscribe({
    next: (res)=>{
      setTimeout(()=>{
        this.myMsg = 'Product added to cart successfully';
      }, 5000)
    },
    error: (err)=>{
      console.log(err);
    }
  })


}


}
