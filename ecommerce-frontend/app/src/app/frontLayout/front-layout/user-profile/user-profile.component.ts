import { Component } from '@angular/core';
import { UsersService } from '../../../core/services/users.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  constructor(private _usersS: UsersService) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  updateUserForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    gender: new FormControl('M', Validators.required),
    address: new FormGroup({
      fulladdress: new FormControl('', Validators.required)
    }),    
  })

  myMessage: string = '';
  errMessage: string = '';
  updateUser(){
    this._usersS.updateUserProfile(this.updateUserForm.value).subscribe({
      next: (res: any) => {
       
        this.myMessage = res.message;
        this.updateUserForm.reset();
        this.getUserProfile();
        setTimeout(() => {
          this.myMessage = '';
        }, 5000);
      
      },
      error: (err: any) => {
        this.errMessage = err.error.message;
        
        setTimeout(() => {
          this.errMessage = '';
        }, 5000);
      
      }
    })
  }

  userProfile: any;
  getUserProfile(){
    this._usersS.getUserProfile().subscribe({         
      next: (res: any) => {
        this.userProfile = res.data;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}