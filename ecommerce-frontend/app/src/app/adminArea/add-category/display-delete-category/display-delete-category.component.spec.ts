import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDeleteCategoryComponent } from './display-delete-category.component';

describe('DisplayDeleteCategoryComponent', () => {
  let component: DisplayDeleteCategoryComponent;
  let fixture: ComponentFixture<DisplayDeleteCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayDeleteCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayDeleteCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
