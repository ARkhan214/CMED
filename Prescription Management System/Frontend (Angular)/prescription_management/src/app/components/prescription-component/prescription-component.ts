import { Component, OnInit } from '@angular/core';
import { Prescription } from '../../models/prescription.model';
import { PrescriptionService } from '../../service/prescription-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prescription-component',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './prescription-component.html',
  styleUrl: './prescription-component.css',
})
export class PrescriptionComponent implements OnInit {

  prescriptions: Prescription[] = [];
  newPrescription: Prescription = {
    id: 0,
    prescriptionDate: new Date(),  // Date type
    patientName: '',
    patientAge: 0,
    patientGender: '',
    diagnosis: '',
    nextVisitDate: undefined,      // optional
    medicines: []                  // always initialized to empty array
  };

  fromDate: string = '';
  toDate: string = '';


  selectedPrescription?: Prescription;

  constructor(
    private prescriptionService: PrescriptionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPrescriptions();
  }

  loadPrescriptionsAll() {
    this.prescriptionService.getAll().subscribe(data => this.prescriptions = data);
  }
  loadPrescriptions() {
   // Reset date filters
    this.fromDate ='';
    this.toDate ='';
    // Load last month prescriptions
    this.prescriptionService.getAllByMonth().subscribe(data => this.prescriptions = data);
  }

  filterByDateRange() {
    if (!this.fromDate || !this.toDate) {
      alert('Please select both From and To dates');
      return;
    }

    this.prescriptionService.getAll(this.fromDate, this.toDate)
      .subscribe({
        next: (data) => {
          this.prescriptions = data;
        },
        error: (err) => {
          console.error('Error loading prescriptions by date range:', err);
          alert('Failed to load prescriptions!');
        }
      });
  }


  selectPrescription(p: Prescription) {
    this.selectedPrescription = { ...p };
  }

  updatePrescription() {
    if (!this.selectedPrescription) return;
    this.prescriptionService.update(this.selectedPrescription.id!, this.selectedPrescription).subscribe(() => {
      this.loadPrescriptions();
      this.selectedPrescription = undefined;
    });
  }


  deletePrescription(id: number) {
    // Confirm before delete
    const confirmDelete = window.confirm('Are you sure you want to delete this prescription?');
    if (!confirmDelete) return; // if cancel

    this.prescriptionService.delete(id).subscribe({
      next: () => {
        window.alert('Prescription deleted successfully!'); // Success alert
        this.loadPrescriptions(); // Table refresh
      },
      error: (err) => {
        console.error('Delete Error:', err);
        window.alert('Failed to delete prescription!'); // Error alert
      }
    });
  }

  viewPrescription(p: Prescription) {
    this.router.navigate(['/prescriptionview',p.id]);
  }

  addMedicineToPrescription() {
    if (this.selectedPrescription) {
      if (!this.selectedPrescription.medicines) {
        this.selectedPrescription.medicines = [];
      }
      this.selectedPrescription.medicines.push({
        medicineName: '',
        dosage: '',
        frequency: '',
        duration: 0
      });
    }
  }




  removeMedicineFromPrescription(index: number) {
    if (this.selectedPrescription?.medicines) {
      this.selectedPrescription.medicines.splice(index, 1);
    }
  }


  // removeMedicineFromPrescription(index: number) {
  //   this.selectedPrescription!.medicines = this.selectedPrescription!.medicines ?? [];
  //   this.selectedPrescription!.medicines.splice(index, 1);
  // }

}
