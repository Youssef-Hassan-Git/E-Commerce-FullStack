import { Component } from '@angular/core';
import { FaqService } from '../../core/services/faq.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-faq',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-faq.component.html',
  styleUrl: './add-faq.component.css'
})
export class AddFAQComponent {
  constructor(private http:HttpClient, private _faqS: FaqService) { }

    addFAQForm: FormGroup = new FormGroup({
    question: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required),
  });


  msg=''
  errMsg = ''


    addFAQ(){
    return this._faqS.addFAQ(this.addFAQForm.value).subscribe({
      next: (res)=> {
        this.msg = res.message;
        this.errMsg = "";
        this.addFAQForm.reset();
        
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
