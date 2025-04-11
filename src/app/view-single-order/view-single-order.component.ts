import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-single-order',
  templateUrl: './view-single-order.component.html',
  styleUrls: ['./view-single-order.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ViewSingleOrderComponent implements OnInit {
  orderId!: number;
  order: any = null;
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('orderId');
      if (idParam) {
        this.orderId = +idParam;
        this.getOrder();
      } else {
        this.errorMessage = 'No Order ID provided.';
      }
    });
  }

  getOrder(): void {
    const apiUrl = `http://localhost:5113/api/Orders/myorder/${this.orderId}`;
    this.http.get<any>(apiUrl).subscribe({
      next: (data) => {
        this.order = data;
        console.log('Fetched order:', data);
      },
      error: (err) => {
        console.error('Error fetching order:', err);
        this.errorMessage = 'Failed to load order.';
      }
    });
  }
}
