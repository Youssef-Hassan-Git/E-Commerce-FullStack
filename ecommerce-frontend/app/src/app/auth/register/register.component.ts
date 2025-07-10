import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { matchPasswords } from '../../core/validators/match-passwords.validator';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

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


  public message: string | null = null;
  public errMessage: string | null = null;

  userRegister(){
    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.message = res.message;
        
      },
      error: (err) => {
        if (err.error && err.error.message) {
          this.errMessage = err.error.errMessage;
        } else {
          this.message = 'Registration failed!';
        }
      }
    })
  }

}
