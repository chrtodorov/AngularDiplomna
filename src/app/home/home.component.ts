import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  }

  logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('clientId');
    window.location.href = '/';
  }
}