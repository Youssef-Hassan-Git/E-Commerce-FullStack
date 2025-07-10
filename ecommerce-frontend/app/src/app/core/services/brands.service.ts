import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {IAddBrand, IBrand, IBrandResponse, ISingleBrandResponse } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http:HttpClient) { }
  private BRANDS_API = 'http://localhost:3000/brands'


displayBrands(): Observable<IBrandResponse> {
  return this.http.get<IBrandResponse>(`${this.BRANDS_API}`);
}

addBrand(brand: IAddBrand): Observable<ISingleBrandResponse>{
  return this.http.post<ISingleBrandResponse>(`${this.BRANDS_API}`, brand)
}

deleteBrand(id: string){
  return this.http.patch(`${this.BRANDS_API}/${id}`, {})
}



}
