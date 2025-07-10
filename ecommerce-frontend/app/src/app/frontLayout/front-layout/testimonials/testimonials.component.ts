import { Component } from '@angular/core';
import { TestimonialsService } from '../../../core/services/testimonials.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  imports: [ReactiveFormsModule, DatePipe, CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  constructor( private _testimonialsS: TestimonialsService){}
 
  ngOnInit(): void {
    this.displayTestimonials();
  }

  msg = '';
  errMsg = '';

  testimonialsForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });


  addTestimonial(){
    this._testimonialsS.addTestimonial(this.testimonialsForm.value).subscribe({
      next: (res)=> {
        this.msg = res.message;
        this.errMsg = '';
        this.testimonialsForm.reset();
        this.displayTestimonials();
        setTimeout(() => {
          this.msg = '';
        }, 3000);
      },
      error: (err)=> {
        this.msg = '';
        this.errMsg = err.error.message;
        setTimeout(() => {
          this.errMsg = '';
        }, 3000);
      }
    })
  } 


  testimonials: any[] = []; 
  displayTestimonials(){
    this._testimonialsS.getTestimonials().subscribe({
      next: (res)=> {
        this.testimonials = res.data;
      } ,
      error: (err)=> {
        console.log(err);
      }
    })
  }
}
