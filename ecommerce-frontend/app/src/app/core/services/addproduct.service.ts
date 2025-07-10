import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddProductRequest, AddProductResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AddproductService {

  constructor(private http: HttpClient) { }

  private ADD_PRODUCT_URL = 'http://localhost:3000/products';

  addProduct(data: FormData){
    return this.http.post<AddProductResponse>(`${this.ADD_PRODUCT_URL}`, data)
  }


}
