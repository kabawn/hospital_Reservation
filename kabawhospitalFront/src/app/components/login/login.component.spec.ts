// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '..//..//auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: any = {};
  showPassword: boolean = false;
  loginError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.router.navigate(['/dashboard']);
        },
        (error: HttpErrorResponse) => {
          console.error('Error:', error);
          // Assuming the error response will have a message field
          // Adjust based on your API response
          this.loginError = error.error.message || 'Invalid credentials. Please try again.';
        }
      );
  }
}
