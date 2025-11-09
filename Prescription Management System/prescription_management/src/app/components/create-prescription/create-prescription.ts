import { Component } from '@angular/core';
import { PrescriptionService } from '../../service/prescription-service';
import { Router, RouterModule } from '@angular/router';
import { Prescription } from '../../models/prescription.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-prescription',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './create-prescription.html',
  styleUrl: './create-prescription.css',
})
export class CreatePrescription {

  prescription: Prescription = {
    prescriptionDate: new Date(),
    patientName: '',
    patientAge: 0,
    patientGender: '',
    diagnosis: '',
    nextVisitDate: undefined,
    medicines: []
  };

  // message: string = '';
  // isError: boolean = false;

  constructor(
    private prescriptionService: PrescriptionService,
    private router: Router
  ) { }

  // Add a new empty medicine
  addMedicine() {
    this.prescription.medicines = this.prescription.medicines || [];
    this.prescription.medicines.push({
      medicineName: '',
      dosage: '',
      frequency: '',
      duration: 0
    });
  }

  // Remove medicine by index
  removeMedicine(index: number) {
    if (this.prescription.medicines) {
      this.prescription.medicines.splice(index, 1);
    }
  }

  // Submit form
  savePrescription() {
    // Basic validation
    if (!this.prescription.patientName || !this.prescription.patientAge || !this.prescription.patientGender) {
      window.alert('Please fill in all required fields!'); //  Success alert
      // this.message = 'Please fill in all required fields!';
      // this.isError = true;
      return;
    }


    // Validate patientAge
    if (this.prescription.patientAge === null || this.prescription.patientAge === undefined ||
      this.prescription.patientAge < 0 || this.prescription.patientAge > 120) {
      window.alert('Please enter a valid age between 0 and 120.');
      return;
    }


    this.prescriptionService.create(this.prescription).subscribe({
      next: (res) => {
        // this.message = 'Prescription created successfully!';
        window.alert('Prescription created successfully!'); //  Success alert
        console.log('Response:', JSON.stringify(res, null, 2));
        // this.isError = false;

        setTimeout(() => {
          this.router.navigate(['/prescriptions']);
        }, 200);
      },
      error: (err) => {
        console.error('Error:', JSON.stringify(err, null, 2));
        // this.message = 'Failed to create prescription!';
        window.alert('Failed to create prescription!'); //  Error alert
        // this.isError = true;
      }
    });

  }

}
