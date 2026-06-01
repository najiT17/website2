import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inverter } from './inverter';

describe('Inverter', () => {
  let component: Inverter;
  let fixture: ComponentFixture<Inverter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inverter],
    }).compileComponents();

    fixture = TestBed.createComponent(Inverter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
