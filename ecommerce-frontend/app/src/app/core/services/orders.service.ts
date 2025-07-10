import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  private ORDERS_API = "http://localhost:3000/order";
  getallorders(): Observable<any> {
    return this.http.get<any>(`${this.ORDERS_API}`);
  }

  updateorder(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.ORDERS_API}/${id}`, data);
  }

  addOrder(address: string): Observable<any> {
    return this.http.post<any>(`${this.ORDERS_API}`, { shippingAddress: address });
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.patch<any>(`${this.ORDERS_API}/${id}`, {});
  }

  
  getUserOrders(): Observable<any> {
    return this.http.get<any>(`${this.ORDERS_API}/user`);
  }
  
}
