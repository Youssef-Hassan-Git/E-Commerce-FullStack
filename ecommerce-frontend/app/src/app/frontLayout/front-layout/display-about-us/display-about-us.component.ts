import { Component, OnInit } from '@angular/core';    
import { AboutusService } from '../../../core/services/aboutus.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-display-about-us',
  imports: [DatePipe, CommonModule],
  templateUrl: './display-about-us.component.html',
  styleUrl: './display-about-us.component.css'
})
export class DisplayAboutUsComponent implements OnInit {
  constructor( private _aboutS: AboutusService){}

  ngOnInit(): void {
    this.displayAboutUs();
  }

  aboutUs: any[] = [];
  displayAboutUs(){
    this._aboutS.getAboutUs().subscribe({
      next: (res)=> {
        console.log('About Us API Response:', res);
        this.aboutUs = res.data;
        console.log('About Us Data:', this.aboutUs);
      },
      error: (err) => {
        console.log('Error fetching about us:', err);
      }
    })
  }
}
