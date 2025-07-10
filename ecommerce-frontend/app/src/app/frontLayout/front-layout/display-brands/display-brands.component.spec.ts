import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBrandsComponent } from './display-brands.component';

describe('DisplayBrandsComponent', () => {
  let component: DisplayBrandsComponent;
  let fixture: ComponentFixture<DisplayBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayBrandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
