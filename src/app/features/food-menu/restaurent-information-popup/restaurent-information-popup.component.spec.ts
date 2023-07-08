import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurentInformationPopupComponent } from './restaurent-information-popup.component';

describe('RestaurentInformationPopupComponent', () => {
  let component: RestaurentInformationPopupComponent;
  let fixture: ComponentFixture<RestaurentInformationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurentInformationPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurentInformationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
