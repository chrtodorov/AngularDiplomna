import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, RouterModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    // Initialize form
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onLogin() {
    const loginData = this.loginForm.value;
    
    console.log('Login data', loginData);

    this.http.post<any>('http://localhost:5113/api/Auth/login', loginData)
      .subscribe({
        next: (response) => {
          console.log('Login successful', response);
          sessionStorage.setItem('clientId', response.clientId);
          sessionStorage.setItem('isLoggedIn', 'true');
          // Save token or navigate to another page if needed

          this.router.navigate(['']); 
        },
        error: (error) => {
          console.error('Login failed', error);
          // Handle login error
        }
      });
  }
}
