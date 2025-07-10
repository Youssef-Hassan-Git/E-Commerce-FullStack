import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFAQComponent } from './add-faq.component';

describe('AddFAQComponent', () => {
  let component: AddFAQComponent;
  let fixture: ComponentFixture<AddFAQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFAQComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
