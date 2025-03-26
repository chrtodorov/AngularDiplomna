import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ViewOrdersComponent implements OnInit {
  @Input() clientId: number = JSON.parse(sessionStorage.getItem('clientId')!); // Default clientId, can be dynamic
  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    console.log('Fetching orders for client:', this.clientId);
    const apiUrl = `http://localhost:5113/api/Orders/myorders/${this.clientId}`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.orders = data;
        console.log('Orders fetched:', data);
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });
  }

  selectedOrderId: number | null = null;

selectOrder(orderId: number) {
  this.selectedOrderId = orderId;
}

generateQRCode(orderId: number | null) {
  if (!orderId) return;

  const qrApiUrl = `https://your-backend-api/api/orders/${orderId}/generate-qrcode`; // Update URL!
  this.http.post(qrApiUrl, {}).subscribe({
    next: (response) => {
      console.log('QR Code generated:', response);
      alert(`QR Code generated for Order #${orderId}`);
    },
    error: (err) => {
      console.error('Error generating QR Code:', err);
      alert(`Failed to generate QR Code for Order #${orderId}`);
    }
  });
}

}
