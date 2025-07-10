import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAboutUsComponent } from './delete-about-us.component';

describe('DeleteAboutUsComponent', () => {
  let component: DeleteAboutUsComponent;
  let fixture: ComponentFixture<DeleteAboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAboutUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
