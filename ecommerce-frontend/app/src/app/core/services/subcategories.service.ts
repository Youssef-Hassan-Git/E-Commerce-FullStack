import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddSubCategory, ISubCategoryResponse } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {
  constructor(private http:HttpClient) { }
  private SUBCATEGORIES_API = 'http://localhost:3000/subcategories'
  displaySubCategories(): Observable<ISubCategoryResponse>{
  return this.http.get<ISubCategoryResponse>(`${this.SUBCATEGORIES_API}`);

}

  addSubCategory(data: IAddSubCategory): Observable<ISubCategoryResponse>{
  return this.http.post<ISubCategoryResponse>(`${this.SUBCATEGORIES_API}`, data); 
  }

  deleteSubCategories(id: string): Observable<any>{
    return this.http.patch(`${this.SUBCATEGORIES_API}/${id}`, {}); 
  }


}
