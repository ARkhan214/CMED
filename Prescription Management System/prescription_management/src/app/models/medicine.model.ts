import { Prescription } from "./prescription.model";

export interface Medicine {
  id?: number;
  medicineName: string;
  dosage: string;      // e.g. "500 mg"
  frequency: string;   // e.g. "1+1+1"
  duration: number;    // in days
  prescriptionId?: number;
  prescription?: Prescription | null; // Optional circular reference for frontend use
}
