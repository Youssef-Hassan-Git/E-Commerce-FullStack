import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFAQComponent } from './display-faq.component';

describe('DisplayFAQComponent', () => {
  let component: DisplayFAQComponent;
  let fixture: ComponentFixture<DisplayFAQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayFAQComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
