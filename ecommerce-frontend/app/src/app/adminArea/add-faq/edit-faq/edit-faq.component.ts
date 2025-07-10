import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FaqService } from '../../../core/services/faq.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-faq',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-faq.component.html',
  styleUrl: './edit-faq.component.css'
})
export class EditFAQComponent implements OnInit{
  constructor(private http:HttpClient, private _faqS: FaqService) { }
  ngOnInit(): void {
    this.displayAllFAQs();
  }

  faq : any [] = [];
  displayAllFAQs(){
    this._faqS.getAllFAQ().subscribe({
      next: (res: any) => {
        this.faq = res.data;

      },
      error: (err) => console.error('Error fetching FAQS', err)
    });
  }



  deActivateFAQ(id: string){
    this._faqS.deActivateFAQ(id).subscribe({
      next: () => {
        this.displayAllFAQs();
      },
      error: (err) => console.error('Error deactivating FAQS', err)
    });
  }

  activateFAQ(id: string){
    this._faqS.activateFAQ(id).subscribe({
      next: () => {
        this.displayAllFAQs();
      },
      error: (err) => console.error('Error activating FAQS', err)
    });
  }



}
