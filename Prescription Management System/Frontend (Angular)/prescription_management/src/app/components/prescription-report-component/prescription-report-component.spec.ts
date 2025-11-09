import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionReportComponent } from './prescription-report-component';

describe('PrescriptionReportComponent', () => {
  let component: PrescriptionReportComponent;
  let fixture: ComponentFixture<PrescriptionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrescriptionReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrescriptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
