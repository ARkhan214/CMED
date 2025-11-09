import { Component, OnInit } from '@angular/core';
import { AppUser } from '../../models/app-user.model';
import { UserService } from '../../service/user-service';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-user-component',
  imports: [CommonModule, NgIf],
  templateUrl: './user-component.html',
  styleUrl: './user-component.css',
})
export class UserComponent implements OnInit {


  user?: AppUser;
  message: string = '';
  isError: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) { }



  //It's Working  (fetch data fetch for user from  backend)
  ngOnInit(): void {
    const user = this.authService.getUserProfileFromStorage();

    if (user) {
      //fetch data fetch for user from  backend
      this.userService.getUserById(user.id!).subscribe({
        next: (userData) => {
          this.user = userData;
          console.log('User loaded:', this.user);
        },
        error: (err) => {
          console.error('Failed to load user', err);
          this.message = 'Failed to load user data';
          this.isError = true;
        }
      });
    } else {
      this.message = 'User not logged in';
      this.isError = true;
    }
  }

  //=====================END ONINIT=====================

  logout() {
    this.authService.logout();
  }


  //=====================Note Start=====================
  //It's not Working  (currentUser holo full user Object ei full object k parse kora sara id hisebe pathacci jar jonno kaj hoyni)
  // ngOnInit(): void {
  //   const userId = localStorage.getItem('currentUser');

  //   if (userId && userId !== '') {
  //     this.userService.getUserById(+userId).subscribe({
  //       next: (userData) => {
  //         this.user = userData;
  //         console.log('User loaded:', this.user);
  //       },
  //       error: (err) => {
  //         console.error('Failed to load user', err);
  //         this.message = 'Failed to load user data';
  //         this.isError = true;
  //       }
  //     });
  //   } else {
  //     this.message = 'User not logged in';
  //     this.isError = true;
  //   }
  // }


  //It's Working  (fetch data fetch for user from  backend)
  // ngOnInit(): void {
  //   const storedUser = localStorage.getItem('currentUser');

  //   if (storedUser) {
  //     const parsedUser = JSON.parse(storedUser); // Parse JSON string
  //     const userId = parsedUser.id; //  Extract id

  //     this.userService.getUserById(userId).subscribe({
  //       next: (userData) => {
  //         this.user = userData;
  //         console.log('User loaded:', this.user);
  //       },
  //       error: (err) => {
  //         console.error('Failed to load user', err);
  //         this.message = 'Failed to load user data';
  //         this.isError = true;
  //       }
  //     });
  //   } else {
  //     this.message = 'User not logged in';
  //     this.isError = true;
  //   }
  // }
  //=====================NOTE END =====================

}
