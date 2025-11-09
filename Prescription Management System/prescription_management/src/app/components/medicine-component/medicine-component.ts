import { Component, OnInit } from '@angular/core';
import { Medicine } from '../../models/medicine.model';
import { MedicineService } from '../../service/medicine-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-medicine-component',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './medicine-component.html',
  styleUrl: './medicine-component.css',
})
export class MedicineComponent implements OnInit {

  medicines: Medicine[] = [];
  newMedicine: Medicine = {
    medicineName: '',
    dosage: '',
    frequency: '',
    duration: 0,
    prescription: null
  };
  selectedMedicine?: Medicine;

  searchId?: number;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showAddForm = true;


  constructor(
    private medicineService: MedicineService
  ) { }

  ngOnInit(): void {
    this.loadMedicines();
  }

  // loadMedicines() {
  //   this.medicineService.getAll().subscribe(data => this.medicines = data);
  // }

  //  Load all medicines
  loadMedicines() {
    this.medicineService.getAll().subscribe({
      next: (data) => {
        this.medicines = data;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load medicines.';
      }
    });
  }

  // Filter medicine by ID
  searchById() {
    if (!this.searchId) {
      this.loadMedicines();
      return;
    }

    this.isLoading = true;
    this.medicineService.getById(this.searchId).subscribe({
      next: (data) => {
        this.medicines = [data]; // show single medicine
        this.errorMessage = '';
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.medicines = [];
        this.errorMessage = 'Medicine not found with this ID.';
        this.isLoading = false;
      }
    });
  }


  // addMedicine() {
  //   this.medicineService.create(this.newMedicine).subscribe(() => {
  //     this.loadMedicines();
  //     this.newMedicine = { medicineName: '', dosage: '', frequency: '', duration: 0 };
  //   });
  // }


  // Add new medicine
  addMedicine() {
    // Basic validation (optional)
    if (!this.newMedicine.medicineName) {
      alert('Please enter a Medicine Name.');
      return;
    }

    // Allow partial fields like your backend
    this.medicineService.create(this.newMedicine).subscribe({
      next: (res) => {
        this.successMessage = 'Medicine saved successfully!';
        this.errorMessage = '';
        this.loadMedicines();
        this.newMedicine = { id: 0, medicineName: '', dosage: '', frequency: '', duration: 0, prescription: null };

        // Hide success after few seconds
        setTimeout(() => this.successMessage = '', 2000);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to save medicine.';
        this.successMessage = '';
      }
    });
  }

  selectMedicine(m: Medicine) {
    this.selectedMedicine = { ...m };
  }

  updateMedicine() {
    if (!this.selectedMedicine) return;
    this.medicineService.update(this.selectedMedicine.id!, this.selectedMedicine).subscribe(() => {
      this.loadMedicines();
      this.selectedMedicine = undefined;
    });
  }

  // deleteMedicine(id: number) {
  //   this.medicineService.delete(id).subscribe(() => this.loadMedicines());
  // }

    deleteMedicine(id: number) {
    if (confirm('Are you sure to delete this medicine?')) {
      this.medicineService.delete(id).subscribe(() => this.loadMedicines());
    }
  }
}
