import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-users',
  imports: [CommonModule],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent implements OnInit {
    allUsers: any[] = [];
    totalUsers: number = 0;
    regularUsers: number = 0;
    adminUsers: number = 0;
    maleUsers: number = 0;

    constructor(private usersService: UsersService) {}

    ngOnInit(){
        this.getAllUsers();
    }

    getAllUsers() {
        this.usersService.getAllUsers().subscribe({
            next: (res) => {
                this.allUsers = res.data;
                this.calculateStats();
                console.log('Users loaded:', this.allUsers);
            },
            error: (err) => {
                console.error('Error fetching users:', err);
            }
        });
    }

    calculateStats() {
        this.totalUsers = this.allUsers.length;
        this.regularUsers = this.allUsers.filter(user => user.role === 'user').length;
        this.adminUsers = this.allUsers.filter(user => user.role === 'admin').length;
        this.maleUsers = this.allUsers.filter(user => user.gender === 'M').length;
    }
}
