import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddCategory, ICategoryResponse, ISingleCategoryResponse } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http:HttpClient) { }
  private CATEGORIES_API = 'http://localhost:3000/categories'
  displayCategories(): Observable<ICategoryResponse>{
  return this.http.get<ICategoryResponse>(`${this.CATEGORIES_API}`);

}

addCategory(category: IAddCategory): Observable<ISingleCategoryResponse>{
  return this.http.post<ISingleCategoryResponse>(`${this.CATEGORIES_API}`, category)
}

deleteCategory(id: string){
  return this.http.patch(`${this.CATEGORIES_API}/${id}`, {})
}





}