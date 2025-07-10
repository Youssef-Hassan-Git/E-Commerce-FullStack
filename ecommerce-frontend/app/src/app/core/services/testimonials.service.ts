import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITestimonialAddRequest, ITestimonialAddResponse, ITestimonialGetResponse } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {

  constructor(private http:HttpClient) { }
  private TESTIMONIALS_API_URL = 'http://localhost:3000/testimonial'

  addTestimonial(data: ITestimonialAddRequest): Observable<ITestimonialAddResponse>{
    return this.http.post<ITestimonialAddResponse>(`${this.TESTIMONIALS_API_URL}`, data)
  }


  getTestimonials(): Observable <ITestimonialGetResponse>{
      return this.http.get<ITestimonialGetResponse>(`${this.TESTIMONIALS_API_URL}`)
    }

    
    getAllTestimonials(): Observable <ITestimonialGetResponse>{
      return this.http.get<ITestimonialGetResponse>(`${this.TESTIMONIALS_API_URL}/getall`)
    }
  
    deActivateTestimonial(id: string){
      return this.http.patch<any>(`${this.TESTIMONIALS_API_URL}/deactivate/${id}`, {})
  
    }  
    
    activateTestimonial(id: string){
      return this.http.patch<any>(`${this.TESTIMONIALS_API_URL}/activate/${id}`, {})
  
    }

}
