import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFavGetResponse, IFavRemoveResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  constructor(private http: HttpClient) { }

  private FAV_API = "http://localhost:3000/fav";
  
  addToFav(id: string): Observable<any> {
    return this.http.post<any>(`${this.FAV_API}/${id}`, {});
  }


  getUserFav(): Observable<IFavGetResponse> {
    return this.http.get<IFavGetResponse>(`${this.FAV_API}`);
  }
  

  removeItemFromFav(id: string): Observable<IFavRemoveResponse> {
    return this.http.patch<IFavRemoveResponse>(`${this.FAV_API}/${id}`, {});
  }


}
