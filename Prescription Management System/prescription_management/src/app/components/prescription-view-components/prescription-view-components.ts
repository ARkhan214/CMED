import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PrescriptionService } from '../../service/prescription-service';
import { Prescription } from '../../models/prescription.model';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import autoTable from 'jspdf-autotable';



@Component({
  selector: 'app-prescription-view-components',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './prescription-view-components.html',
  styleUrl: './prescription-view-components.css',
})
export class PrescriptionViewComponents {

  // prescription?: Prescription;
  // isLoading: boolean = true;
  // errorMessage: string = '';

  // constructor(
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private prescriptionService: PrescriptionService
  // ) { }

  // ngOnInit(): void {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   if (id) {
  //     this.prescriptionService.getById(id).subscribe({
  //       next: (data) => {
  //         this.prescription = data;
  //         this.isLoading = false;
  //       },
  //       error: (err) => {
  //         console.error(err);
  //         this.errorMessage = 'Failed to load prescription!';
  //         this.isLoading = false;
  //       }
  //     });
  //   } else {
  //     this.errorMessage = 'Invalid Prescription ID!';
  //     this.isLoading = false;
  //   }
  // }

  // goBack() {
  //   this.router.navigate(['/prescriptions']);
  // }



  //  prescription?: Prescription;
  // isLoading: boolean = true;
  // errorMessage: string = '';

  // constructor(
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private prescriptionService: PrescriptionService
  // ) { }

  // ngOnInit(): void {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   if (id) {
  //     this.prescriptionService.getById(id).subscribe({
  //       next: (data) => {
  //         this.prescription = data;
  //         this.isLoading = false;
  //       },
  //       error: (err) => {
  //         console.error(err);
  //         this.errorMessage = 'Failed to load prescription!';
  //         this.isLoading = false;
  //       }
  //     });
  //   } else {
  //     this.errorMessage = 'Invalid Prescription ID!';
  //     this.isLoading = false;
  //   }
  // }

  // goBack() {
  //   this.router.navigate(['/prescriptions']);
  // }

  // generatePDF() {
  //   if (!this.prescription) return;

  //   const doc = new jsPDF('p', 'mm', 'a4');
  //   const pageWidth = doc.internal.pageSize.getWidth();

  //   // -------- Header ----------
  //   doc.setFontSize(18);
  //   doc.setTextColor(0, 51, 102);
  //   doc.setFont('helvetica', 'bold');
  //   doc.text('Prescription', pageWidth / 2, 15, { align: 'center' });

  //   doc.setFontSize(12);
  //   doc.setTextColor(0, 0, 0);
  //   doc.setFont('helvetica', 'normal');
  //   doc.text(`Prescription ID: ${this.prescription.id}`, 15, 25);
  //   doc.text(`Patient Name: ${this.prescription.patientName}`, 15, 32);
  //   doc.text(`Age: ${this.prescription.patientAge}`, 15, 39);
  //   doc.text(`Gender: ${this.prescription.patientGender}`, 15, 46);

  //   const presDate = this.prescription.prescriptionDate
  //     ? new Date(this.prescription.prescriptionDate).toISOString().split('T')[0]
  //     : '';
  //   const nextVisit = this.prescription.nextVisitDate
  //     ? new Date(this.prescription.nextVisitDate).toISOString().split('T')[0]
  //     : '';

  //   doc.text(`Prescription Date: ${presDate}`, 15, 53);
  //   doc.text(`Next Visit: ${nextVisit}`, 15, 60);
  //   doc.text(`Diagnosis: ${this.prescription.diagnosis}`, 15, 67);

  //   // -------- Medicines Table ----------
  //   const tableData = this.prescription.medicines?.map((med, index) => [
  //     index + 1,
  //     med.medicineName,
  //     med.dosage,
  //     med.frequency,
  //     med.duration
  //   ]) || [];

  //   autoTable(doc, {
  //     head: [['#', 'Medicine Name', 'Dosage', 'Frequency', 'Duration (days)']],
  //     body: tableData,
  //     startY: 75,
  //     styles: { fontSize: 11 },
  //     headStyles: { fillColor: [0, 51, 102], textColor: 255 },
  //     alternateRowStyles: { fillColor: [240, 248, 255] },
  //   });

  //   // -------- Footer ----------
  //   const finalY = (doc as any).lastAutoTable?.finalY || 0;
  //   doc.setFontSize(9);
  //   doc.setTextColor(100);
  //   doc.text(
  //     'This prescription is system generated and does not require a signature.',
  //     15,
  //     finalY + 10
  //   );

  //   // Save PDF
  //   doc.save(`Prescription-${this.prescription.id}.pdf`);
  // }



  //===============Last Part==========
  prescription?: Prescription;
  isLoading: boolean = true;
  errorMessage: string = '';

  @ViewChild('prescriptionContent') prescriptionContent!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prescriptionService: PrescriptionService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.prescriptionService.getById(id).subscribe({
        next: (data) => {
          this.prescription = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to load prescription!';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Invalid Prescription ID!';
      this.isLoading = false;
    }
  }

  goBack() {
    this.router.navigate(['/prescriptions']);
  }

  savePDF() {
    if (!this.prescription) return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();

    // Title
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Prescription', pageWidth / 2, 15, { align: 'center' });

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');

    // Patient Info
    const patientInfo = [
      ['Patient Name', this.prescription.patientName],
      ['Age', this.prescription.patientAge.toString()],
      ['Gender', this.prescription.patientGender],
      ['Diagnosis', this.prescription.diagnosis],
      ['Prescription Date', this.prescription.prescriptionDate ? new Date(this.prescription.prescriptionDate).toISOString().split('T')[0] : '---'],
      ['Next Visit', this.prescription.nextVisitDate ? new Date(this.prescription.nextVisitDate).toISOString().split('T')[0] : '---']
    ];

    let startY = 25;
    patientInfo.forEach(([label, value]) => {
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${label}:`, 15, startY);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${value}`, 60, startY);
      startY += 7;
    });

    // Medicines Table
    const tableBody = this.prescription.medicines?.map((med, index) => [
      (index + 1).toString(),
      med.medicineName,
      med.dosage,
      med.frequency,
      med.duration.toString()
    ]) || [];

    autoTable(pdf, {
      head: [['#', 'Medicine Name', 'Dosage', 'Frequency', 'Duration (days)']],
      body: tableBody,
      startY: startY + 5,
      theme: 'grid',
      headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 11, cellPadding: 3 },
      alternateRowStyles: { fillColor: [240, 248, 255] },
    });

//Working For Pdf name(Unique er jonno prescription.id,name,date,time_milisecond add kora hoise)
    const patientName = this.prescription.patientName.replace(/\s+/g, '_'); // name er moddhe space exchange by underscore
    const presDate = this.prescription.prescriptionDate
      ? new Date(this.prescription.prescriptionDate).toISOString().split('T')[0]
      : 'no-date';
    const timestamp = new Date().getTime(); // milliseconds

    pdf.save(`Prescription_${this.prescription.id}_${patientName}_${presDate}_${timestamp}.pdf`);
  }

}
