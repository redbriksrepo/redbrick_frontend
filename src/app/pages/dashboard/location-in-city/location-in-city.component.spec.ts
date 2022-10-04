import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationInCityComponent } from './location-in-city.component';

describe('LocationInCityComponent', () => {
  let component: LocationInCityComponent;
  let fixture: ComponentFixture<LocationInCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationInCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationInCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
