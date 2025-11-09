import { Injectable } from '@angular/core';
import { environment } from '../api/environment';
import { HttpClient } from '@angular/common/http';
import { Medicine } from '../models/medicine.model';
import { Observable } from 'rxjs';
import { Prescription } from '../models/prescription.model';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  private baseUrl = `${environment.apiUrl}/api/v1/medicines`;

  constructor(private http: HttpClient) {}

  // Create
  create(medicine: Medicine): Observable<Medicine> {
    return this.http.post<Medicine>(`${this.baseUrl}`, medicine);
  }

  // Read all
  getAll(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(`${this.baseUrl}`);
  }

  // Read by ID
  getById(id: number): Observable<Medicine> {
    return this.http.get<Medicine>(`${this.baseUrl}/${id}`);
  }

    //Get prescription by medicine id 
  getPrescriptionByMedicineId(medicineId: number): Observable<Prescription> {
    return this.http
      .get<Prescription>(`${this.baseUrl}/${medicineId}/prescription`);
  }

  // Update
  update(id: number, medicine: Medicine): Observable<Medicine> {
    return this.http.put<Medicine>(`${this.baseUrl}/${id}`, medicine);
  }

  // Delete
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
