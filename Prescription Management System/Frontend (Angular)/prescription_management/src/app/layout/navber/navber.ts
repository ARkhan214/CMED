import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { AppUser } from '../../models/app-user.model';

@Component({
  selector: 'app-navber',
  imports: [RouterLink, CommonModule],
  templateUrl: './navber.html',
  styleUrl: './navber.css',
})
export class Navber implements OnInit {
  userRole: string | null = null;
  currentUser: AppUser | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUserProfileFromStorage();
    this.userRole = this.currentUser?.role || null;
    this.isLoggedIn = this.authService.isAuthenticated();

    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      this.userRole = user?.role || null;
      this.isLoggedIn = !!user;
      this.cdr.markForCheck();
    });
  }

  logout(): void {
    this.authService.logout();
  }
  
}
