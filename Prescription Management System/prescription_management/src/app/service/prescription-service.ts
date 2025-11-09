import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prescription } from '../models/prescription.model';
import { environment } from '../api/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionService {
  
private baseUrl = `${environment.apiUrl}/api/v1/prescription`;

  constructor(private http: HttpClient) {}

  // Get all (with optional date filters)
  getAllByMonth(from?: string, to?: string): Observable<Prescription[]> {
    let params = new HttpParams();
    if (from) params = params.set('from', from);
    if (to) params = params.set('to', to);

    return this.http.get<Prescription[]>(`${this.baseUrl}/allbymonth`, { params });
  }

  // Get all (with optional date filters)
  getAll(from?: string, to?: string): Observable<Prescription[]> {
    let params = new HttpParams();
    if (from) params = params.set('from', from);
    if (to) params = params.set('to', to);

    return this.http.get<Prescription[]>(`${this.baseUrl}`, { params });
  }

  // Get by ID
  getById(id: number): Observable<Prescription> {
    return this.http.get<Prescription>(`${this.baseUrl}/${id}`);
  }

  // Create
  create(prescription: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(`${this.baseUrl}`, prescription);
  }

  // Update
  update(id: number, prescription: Prescription): Observable<Prescription> {
    return this.http.put<Prescription>(`${this.baseUrl}/${id}`, prescription);
  }

  // Delete
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
