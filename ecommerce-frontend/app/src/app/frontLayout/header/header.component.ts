import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private _authService: AuthService, private _router: Router) {}

  getUsername(){
    return this._authService.getUsername();
  }

  logOut(){
    this._authService.userLogOut();

    this._router.navigate(['/products']);
  }
  
}
