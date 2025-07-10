import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGetCartResponse, IRemoveCartItemRequest, IRemoveCartItemResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  private CART_API = "http://localhost:3000/cart";
  // getallcart(): Observable<any> {
  //   return this.http.get<any>(`${this.CART_API}`);
  // }


  addToCart(id: string): Observable<any> {
    return this.http.post<any>(`${this.CART_API}/${id}`, {});
  }

  getUserCart(): Observable<IGetCartResponse> {
    return this.http.get<IGetCartResponse>(`${this.CART_API}`);
  }

  removeItemFromCart(data: IRemoveCartItemRequest): Observable<IRemoveCartItemResponse> {
    return this.http.patch<IRemoveCartItemResponse>(`${this.CART_API}`, data);
  }


}
