import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppUser } from '../../models/app-user.model';
import { UserService } from '../../service/user-service';

import { Status } from '../../models/status.enum';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-registration-component',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './user-registration-component.html',
  styleUrl: './user-registration-component.css',
})
export class UserRegistrationComponent {

  user: AppUser = {
    username: '',
    password: '',
    email: '',
    status: Status.ACTIVE, // default
  };
  message: string = '';
  isError: boolean = false;
  loading: boolean = false;

  statusOptions = Object.values(Status); // ["ACTIVE", "INACTIVE", "SUSPENDED", "DELETED"]

  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  register() {

    // Trim email & password before validation
    this.user.email = this.user.email.trim();
    this.user.password = this.user.password.trim();

    // basic validation
    if (!this.user.username || !this.user.password || !this.user.email || !this.user.gender) {
      // this.message = 'Please fill in all required fields.';
      window.alert('Please fill in all required fields.');
      this.isError = true;
      return;
    }

    // simple regex for frontend email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.user.email)) {
      this.message = 'Please enter a valid email address.';
      this.isError = true;
      return;
    }

    this.loading = true;
    this.message = '';

    this.userService.register(this.user).subscribe({
      next: (response: string) => {

        //age any silo now string
        // The backend is working fine, but Angular's HttpClient tries to parse all responses as JSON by default.
        // If the responseType is plain text, Angular will still attempt JSON parsing,
        // which causes a parsing error and triggers the error block even on successful responses.(tai any na diea string dite hobe)


        this.message = response; // backend message 
        this.isError = false;
        this.loading = false;

        // form clear
        this.user = { username: '', password: '', email: '', status: Status.ACTIVE };

        // detect view change
        this.cdr.markForCheck();

        // navigate after delay
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 500);
      },
      error: (err) => {
        this.message = err.error
          ? (typeof err.error === 'string' ? err.error : JSON.stringify(err.error))
          : 'Registration failed due to server error.';
        this.isError = true;
        this.loading = false;
      },
    });



  }

}
