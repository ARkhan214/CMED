import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../api/environment';
import { AppUser } from '../models/app-user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/api/v1/user`;
  private currentUserSubject: BehaviorSubject<AppUser | null>;
  public currentUser$: Observable<AppUser | null>;

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const storedUser = this.isBrowser()
      ? JSON.parse(localStorage.getItem('currentUser') || 'null')
      : null;
    this.currentUserSubject = new BehaviorSubject<AppUser | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  // LOGIN (save user + token)
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((res) => {
        if (res && res.user) {
          const user: AppUser = res.user;
          const token = res.token || '';

          this.storeToken(token);
          this.storeUserProfile(user);
          this.currentUserSubject.next(user);
        }


      })
    );
  }

  // LOGOUT
  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  storeToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('token') : null;
  }

  storeUserProfile(user: AppUser): void {
    if (this.isBrowser()) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  getUserProfileFromStorage(): AppUser | null {
    if (this.isBrowser()) {
      const userProfile = localStorage.getItem('currentUser');
      return userProfile ? JSON.parse(userProfile) : null;
    }
    return null;
  }

  get currentUserValue(): AppUser | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUserRole(): string | null {
    return this.currentUserValue?.role || null;
  }

  isUser(): boolean {
    return this.getCurrentUserRole() === 'USER';
  }


  // Get by ID
  getUserById(id: number): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.baseUrl}/${id}`);
  }
}
