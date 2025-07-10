import { Component } from '@angular/core';
import { OrdersService } from '../../../core/services/orders.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order',
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  constructor(private _ordersS: OrdersService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  orders: any[] = [];
  orderMsgSuccess: string = '';

  getOrders(){
    this._ordersS.getUserOrders().subscribe({
      next: (res: any) => {
        this.orders = res.data;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  deleteOrder(id: string){
    this._ordersS.deleteOrder(id).subscribe({
      next: (res: any) => {
        this.orderMsgSuccess = res.message;
        this.getOrders();
        setTimeout(() => {
          this.orderMsgSuccess = '';
        }, 5000);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'placed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: string): string {
    switch(status) {
      case 'placed':
        return 'Order Placed';
      case 'preparing':
        return 'Preparing';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  }

  getImageUrl(imgPath: string): string {
    if (!imgPath) return '';
    const normalizedPath = imgPath.replace(/\\/g, '/');
    return `http://localhost:3000/${normalizedPath}`;
  }

  getOrderTotal(order: any): number {
    if (!order.products) return 0;

    let total = 0;
    for(let i = 0; i < order.products.length; i++){
      total += order.products[i].price;
    }
    return total;
 
}

}