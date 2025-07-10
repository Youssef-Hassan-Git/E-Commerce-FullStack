import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private http: HttpClient, private _authS: AuthService, private _router: Router){}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  message: string | null | undefined;

  userLogin(){
    this._authS.login(this.loginForm.value).subscribe({
     
     
      next: ()=> {
        // Store user role in localStorage for auth guard
        const userRole = this._authS.getRole();
        if (userRole) {
          localStorage.setItem('userRole', userRole);
        }
        
        if(userRole == "user"){
          this._router.navigate(['products'])
        }
        else if(userRole === 'admin'){
          this._router.navigate(['admin'])
        }
      },

      error: (err) => {
        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Login failed!';
        }
      }
    })
  }

}
