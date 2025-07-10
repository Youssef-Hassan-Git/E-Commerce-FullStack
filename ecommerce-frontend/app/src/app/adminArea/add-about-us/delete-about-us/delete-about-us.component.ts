import { Component, OnInit } from '@angular/core';
import { AboutusService } from '../../../core/services/aboutus.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-about-us',
  imports: [CommonModule],
  templateUrl: './delete-about-us.component.html',
  styleUrl: './delete-about-us.component.css'
})
export class DeleteAboutUsComponent implements OnInit {
  constructor(private aboutusService: AboutusService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.displayAboutUs();
  }

  aboutusAll: any[] = [];

  displayAboutUs() {
    this.aboutusService.getAboutUs().subscribe({
      next: (res) => {
        this.aboutusAll = res.data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  deleteAboutUs(id: string) {
    this.aboutusService.deleteAboutUs(id).subscribe({
      next: (res) => {
        console.log(res);
      }
    });
  }



}
