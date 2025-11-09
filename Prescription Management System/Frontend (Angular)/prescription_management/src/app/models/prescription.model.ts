import { Medicine } from './medicine.model';

export interface Prescription {
  id?: number;
  prescriptionDate: Date; 
  patientName: string;
  patientAge: number;
  patientGender: string;
  diagnosis: string;
  nextVisitDate?: Date;   
  medicines?: Medicine[];   // Array of medicines
}
