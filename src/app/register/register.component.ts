import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      this.http.post('http://localhost:5113/api/Auth/register', formData)
        .subscribe({
          next: (response) => {
            console.log('Registration successful', response);
            // Handle success: maybe redirect to login page
          },
          error: (error) => {
            console.error('Registration failed', error);
            // Handle error
          }
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
