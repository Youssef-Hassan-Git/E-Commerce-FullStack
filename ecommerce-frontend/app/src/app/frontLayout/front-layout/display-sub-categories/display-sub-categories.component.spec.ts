import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubCategoriesComponent } from './display-sub-categories.component';

describe('DisplaySubCategoriesComponent', () => {
  let component: DisplaySubCategoriesComponent;
  let fixture: ComponentFixture<DisplaySubCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplaySubCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySubCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
