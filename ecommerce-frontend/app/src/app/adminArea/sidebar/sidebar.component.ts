import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  username: string | null | undefined;

  constructor(private AuthService: AuthService, private _router:Router) {}

  ngOnInit() {
    this.username = this.AuthService.getUsername();


  }

  Register(){
  this._router.navigate(['/adminRegister'])
  }
  logOut() {
    this.AuthService.adminLogOut();
    this._router.navigate(['/login'])

  }



}
