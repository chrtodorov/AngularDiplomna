import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {
  items: Item[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems() {
    const apiUrl = 'http://localhost:5113/api/Items'; // Replace with actual API
    this.http.get<Item[]>(apiUrl).subscribe({
      next: (response) => {
        this.items = response;
      },
      error: (err) => {
        console.error('Error fetching items:', err);
      }
    });
  }

  orderItem(itemId: number) {

    const clientId = JSON.parse(sessionStorage.getItem('clientId')!);

    const orderData = {
      clientId,
      itemId
    };


    this.http.post<any>('http://localhost:5113/api/Orders/order', orderData )
      .subscribe({
        next: (response) => {
          console.log('Order successful', response);
        },
        error: (error) => {
          console.error('Order failed', error);
          // Handle login error
        }
      });
  }
}
