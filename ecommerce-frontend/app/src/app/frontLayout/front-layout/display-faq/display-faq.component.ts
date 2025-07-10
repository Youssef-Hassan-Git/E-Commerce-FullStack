import { Component } from '@angular/core';
import { FaqService } from '../../../core/services/faq.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-display-faq',
  imports: [DatePipe, CommonModule],
  templateUrl: './display-faq.component.html',
  styleUrl: './display-faq.component.css'
})
export class DisplayFAQComponent {
  constructor( private _faqS: FaqService){}

  ngOnInit(): void {
    this.displayFAQ();
  }

  
  faq: any[] = [];
  displayFAQ(){
    this._faqS.getFAQ().subscribe({
      next: (res)=> {
        this.faq = res.data;
      },
      error: (err)=> {
        console.log(err);
      }
    })
  } 
}
