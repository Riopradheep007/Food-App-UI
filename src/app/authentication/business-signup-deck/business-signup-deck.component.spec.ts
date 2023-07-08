import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSignupDeckComponent } from './business-signup-deck.component';

describe('BusinessSignupDeckComponent', () => {
  let component: BusinessSignupDeckComponent;
  let fixture: ComponentFixture<BusinessSignupDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessSignupDeckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSignupDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
