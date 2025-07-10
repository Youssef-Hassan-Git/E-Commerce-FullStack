import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TestimonialsService } from '../../core/services/testimonials.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-testimonials',
  imports: [CommonModule],
  templateUrl: './edit-testimonials.component.html',
  styleUrl: './edit-testimonials.component.css'
})
export class EditTestimonialsComponent implements OnInit {
  constructor(private testimonialsService: TestimonialsService, http:HttpClient) {}
  
  ngOnInit(): void {
    this.getAllTestimonials();
  }


  allTestimonials: any[] = [];
  getAllTestimonials() {
    this.testimonialsService.getAllTestimonials().subscribe(
      (res) => {
        this.allTestimonials = res.data;
      }
    )
  }


  activateTestimonial(id: string) {
    this.testimonialsService.activateTestimonial(id).subscribe(
      (res) => {
        this.getAllTestimonials();
      }
    )
  }


  deActivateTestimonial(id: string) {
    this.testimonialsService.deActivateTestimonial(id).subscribe(
      (res) => {
        this.getAllTestimonials();
      }
    )
  }


  
}
