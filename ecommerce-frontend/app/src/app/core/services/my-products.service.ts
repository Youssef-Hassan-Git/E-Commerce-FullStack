import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct, IProductResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MyProductsService {

  constructor(private http:HttpClient) { }

   private GET_PRODUCTS_URL = 'http://localhost:3000/products';
   private RELATED_PRODUCTS_URL = 'http://localhost:3000/products/related';


  displayMyProducts(page = 1, limit = 5){
    return this.http.get(`${this.GET_PRODUCTS_URL}?page=${page}&limit=${limit}`);
  }

  deleteProduct(id: string){
    return this.http.patch(`${this.GET_PRODUCTS_URL}/${id}`, {})
  }

  editProduct(id:string,data: FormData){
  return this.http.put<any>(`${this.GET_PRODUCTS_URL}/${id}`, data);

  }

  getProductById(id: string){
    return this.http.get<any>(`${this.GET_PRODUCTS_URL}/${id}`);
  }

  getRelatedProducts(id: string){
    return this.http.get<any>(`${this.RELATED_PRODUCTS_URL}/${id}`);
  }


}
