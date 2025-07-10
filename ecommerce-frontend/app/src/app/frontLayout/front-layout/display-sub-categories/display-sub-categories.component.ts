import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SubcategoriesService } from '../../../core/services/subcategories.service';

@Component({
  selector: 'app-display-sub-categories',
  imports: [CommonModule],
  templateUrl: './display-sub-categories.component.html',
  styleUrl: './display-sub-categories.component.css'
})
export class DisplaySubCategoriesComponent implements OnInit {
  constructor(private _subCategoriesS: SubcategoriesService){}

  ngOnInit(): void {
    this.displaySubCategories();
  }

  subCategories: any[] = [];

  displaySubCategories(){
    this._subCategoriesS.displaySubCategories().subscribe({
      next: (res: any) => {
        this.subCategories = res.data;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
