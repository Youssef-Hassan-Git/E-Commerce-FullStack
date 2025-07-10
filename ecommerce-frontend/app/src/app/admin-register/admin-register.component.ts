import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { matchPasswords } from '../core/validators/match-passwords.validator';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-admin-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.css'
})
export class AdminRegisterComponent {
  constructor(private http:HttpClient, private authService: AuthService){}

  registerForm:FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    gender: new FormControl('M', Validators.required),
    address: new FormGroup({
      fulladdress: new FormControl('', Validators.required)
    })
  },{ validators: matchPasswords('password', 'confirmPassword') });


  message=''
  errMessage = ''

  adminRegister(){
    this.authService.adminRegister(this.registerForm.value).subscribe({
      next: (res)=> {
        this.message = res.message;
        this.errMessage = "";
        this.registerForm.reset();
        
        setTimeout(() => {
          this.message = "";
        }, 3000); 
             
      },
      error: (err) => { 
        this.message = "";
        this.errMessage = err.error.message;
        
        setTimeout(() => {
          this.errMessage = "";
        }, 3000);
      }
    })
  }
}
