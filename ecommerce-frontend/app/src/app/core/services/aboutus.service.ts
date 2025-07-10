import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddAboutUsRequest, IAddAboutUsResponse, IGetAboutUsResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AboutusService {

  constructor(private http: HttpClient) { }
  private ABOUTUS_API = "http://localhost:3000/aboutus";

  addAboutUs(aboutUs: IAddAboutUsRequest): Observable<IAddAboutUsResponse> {
    return this.http.post<IAddAboutUsResponse>(`${this.ABOUTUS_API}`, aboutUs);
  }

  getAboutUs(): Observable<any> {
    return this.http.get<any>(`${this.ABOUTUS_API}`);
  } 
  
  updateAboutUs(aboutUs: IAddAboutUsRequest): Observable<IAddAboutUsResponse> {
    return this.http.put<IAddAboutUsResponse>(`${this.ABOUTUS_API}`, aboutUs);
  }

  deleteAboutUs(id: string): Observable<any> {
    return this.http.delete<any>(`${this.ABOUTUS_API}/${id}`);
  }

}
