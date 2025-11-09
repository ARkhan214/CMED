import { Injectable } from '@angular/core';
import { environment } from '../api/environment';
import { HttpClient } from '@angular/common/http';
import { AppUser } from '../models/app-user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
 private baseUrl = `${environment.apiUrl}/api/v1/user`;

  constructor(private http: HttpClient) {}

  // Register
  // register(user: AppUser): Observable<string> {
  //   return this.http.post<string>(`${this.baseUrl}/register`, user);
  // }

  register(user: AppUser): Observable<string> {
  return this.http.post(`${this.baseUrl}`, user, { responseType: 'text' });
}



  // Get all users
  getAllUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`${this.baseUrl}`);
  }

  // Get by ID
  getUserById(id: number): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.baseUrl}/${id}`);
  }

  // Update
  updateUser(id: number, user: AppUser): Observable<AppUser> {
    return this.http.put<AppUser>(`${this.baseUrl}/${id}`, user);
  }

  // Delete
  deleteUser(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

}
