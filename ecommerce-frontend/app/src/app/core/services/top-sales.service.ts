import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopSalesService {

  constructor(private http: HttpClient) { }

  private TOP_SALES_API = "http://localhost:3000/topsales";
  
  getTopSales(): Observable<any> {
    return this.http.get<any>(`${this.TOP_SALES_API}`);
  }
}
