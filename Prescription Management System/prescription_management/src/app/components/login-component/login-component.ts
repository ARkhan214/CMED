import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUser } from '../../models/app-user.model';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  message: string = '';
  isError: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {

    // Trim email & password before validation
    this.email = this.email.trim();
    this.password = this.password.trim();

    if (!this.email || !this.password) {
      this.message = 'Please enter both email and password!';
      this.isError = true;
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        if (res.status === 'success' && res.user) {
          const user: AppUser = res.user;
          this.isError = false;

          this.router.navigate(['/prescriptions']);

        } else {
          this.message = res.message || 'Login failed';
          this.isError = true;
        }
      },
      error: (err) => {
        this.message = err.error?.message || 'Login failed due to server error';
        this.isError = true;
      },
    });
  }

}
