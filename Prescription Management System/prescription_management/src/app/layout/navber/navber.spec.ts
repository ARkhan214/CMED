import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navber } from './navber';

describe('Navber', () => {
  let component: Navber;
  let fixture: ComponentFixture<Navber>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navber]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navber);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
