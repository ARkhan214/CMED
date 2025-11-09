import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionViewComponents } from './prescription-view-components';

describe('PrescriptionViewComponents', () => {
  let component: PrescriptionViewComponents;
  let fixture: ComponentFixture<PrescriptionViewComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrescriptionViewComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrescriptionViewComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
