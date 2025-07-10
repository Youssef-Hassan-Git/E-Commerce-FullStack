import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-orders',
  imports: [CommonModule],
  templateUrl: './update-orders.component.html',
  styleUrl: './update-orders.component.css'
})
export class UpdateOrdersComponent implements OnInit {

  constructor(private ordersService: OrdersService) {}

  allorders: any[] = [];
  totalOrders: number = 0;
  pendingOrders: number = 0;
  completedOrders: number = 0;
  totalRevenue: number = 0;

  ngOnInit() {
    this.getallorders();
  }

  getallorders() {
    this.ordersService.getallorders().subscribe({
      next: (res) => {
        this.allorders = res.data;
        this.calculateStats();
      },
      error: (err: any) => {
        console.log(err);
      } 
    });
  }

  calculateStats() {
    this.totalOrders = this.allorders.length;
    
    this.pendingOrders = 0;
    this.completedOrders = 0;
    this.totalRevenue = 0;
    
    for (let order of this.allorders) {
      if (['placed', 'preparing', 'shipped'].includes(order.status)) {
        this.pendingOrders++;
      }
      if (order.status === 'delivered') {
        this.completedOrders++;
      }
      
      for (let product of order.products) {
        this.totalRevenue += product.price;
      }
    }
  }

  updateorder(id: string, newStatus: string) {
    this.ordersService.updateorder(id, { newStatus: newStatus }).subscribe({
      next: (res) => {
        console.log(res);
        this.getallorders(); // Refresh data after update
      },    
      error: (err: any) => {
        console.log(err);
      } 
    });
  }
}
