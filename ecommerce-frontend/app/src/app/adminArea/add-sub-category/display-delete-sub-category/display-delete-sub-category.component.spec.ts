import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDeleteSubCategoryComponent } from './display-delete-sub-category.component';

describe('DisplayDeleteSubCategoryComponent', () => {
  let component: DisplayDeleteSubCategoryComponent;
  let fixture: ComponentFixture<DisplayDeleteSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayDeleteSubCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayDeleteSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
