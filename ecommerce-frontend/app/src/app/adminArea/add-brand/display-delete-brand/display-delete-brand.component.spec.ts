import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDeleteBrandComponent } from './display-delete-brand.component';

describe('DisplayDeleteBrandComponent', () => {
  let component: DisplayDeleteBrandComponent;
  let fixture: ComponentFixture<DisplayDeleteBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayDeleteBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayDeleteBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
