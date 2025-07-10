import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAboutUsComponent } from './display-about-us.component';

describe('DisplayAboutUsComponent', () => {
  let component: DisplayAboutUsComponent;
  let fixture: ComponentFixture<DisplayAboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayAboutUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
