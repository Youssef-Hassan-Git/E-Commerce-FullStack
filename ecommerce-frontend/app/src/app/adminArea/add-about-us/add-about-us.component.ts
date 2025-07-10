import { Component } from '@angular/core';
import { AboutusService } from '../../core/services/aboutus.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAddAboutUsRequest } from '../../core/models/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-about-us',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-about-us.component.html',
  styleUrl: './add-about-us.component.css'
})
export class AddAboutUsComponent {
  constructor(private aboutusService: AboutusService, http: HttpClient) {}

  addAboutUsForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });       

  msg = '';
  errMsg = '';
  addAboutUs() {
    this.aboutusService.addAboutUs(this.addAboutUsForm.value as IAddAboutUsRequest).subscribe(
     {  next: (res)=> {
        this.msg = res.message;
        this.errMsg = "";
          this.addAboutUsForm.reset();
        
        setTimeout(() => {
          this.msg = "";
        }, 3000); 
             
      },
      error: (err) => { 
        this.msg = "";
        this.errMsg = err.error.message;
        
        setTimeout(() => {
          this.errMsg = "";
        }, 3000);
      }
    })
  }

}
