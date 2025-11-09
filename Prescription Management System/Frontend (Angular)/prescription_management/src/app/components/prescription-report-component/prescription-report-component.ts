import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Prescription } from '../../models/prescription.model';
import { PrescriptionService } from '../../service/prescription-service';
import { CommonModule, DatePipe } from '@angular/common';


@Component({
  selector: 'app-prescription-report-component',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './prescription-report-component.html',
  styleUrl: './prescription-report-component.css',
})
export class PrescriptionReportComponent implements OnInit {

  prescriptions: Prescription[] = [];
  selectedFromDate: string = '';
  selectedToDate: string = '';
  isLoading = false;

  constructor(private prescriptionService: PrescriptionService) {}

  ngOnInit(): void {
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    this.selectedFromDate = monthStart.toISOString().split('T')[0];
    this.selectedToDate = today.toISOString().split('T')[0];

    this.loadReport(this.selectedFromDate, this.selectedToDate);
  }

  loadReport(from: string, to: string): void {
    this.isLoading = true;
    this.prescriptionService.getAll(from, to).subscribe({
      next: (data) => {
        this.prescriptions = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading prescriptions', err);
        this.isLoading = false;
      }
    });
  }

  onDateChange(): void {
    this.loadReport(this.selectedFromDate, this.selectedToDate);
  }

  get prescriptionCount(): number {
    return this.prescriptions.length;
  }

}
