import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFaqAddRequest, IFaqAddResponse, IFaqGetResponse } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http:HttpClient) { }
  private FAQ_API_URL = 'http://localhost:3000/faq'


  addFAQ(data:IFaqAddRequest): Observable <IFaqAddResponse>{
    return this.http.post<IFaqAddResponse>(`${this.FAQ_API_URL}`, data)
  }
  getFAQ(): Observable <IFaqGetResponse>{
    return this.http.get<IFaqGetResponse>(`${this.FAQ_API_URL}`)
  }  
  getAllFAQ(): Observable <IFaqGetResponse>{
    return this.http.get<IFaqGetResponse>(`${this.FAQ_API_URL}/getall`)
  }

  deActivateFAQ(id: string){
    return this.http.patch<any>(`${this.FAQ_API_URL}/deactivate/${id}`, {})

  }  
  
  activateFAQ(id: string){
    return this.http.patch<any>(`${this.FAQ_API_URL}/activate/${id}`, {})

  }




}
