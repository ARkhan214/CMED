import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppUser } from '../../models/app-user.model';
import { Status } from '../../models/status.enum';
import { UserService } from '../../service/user-service';

@Component({
  selector: 'app-view-all-users',
  imports: [
    CommonModule, FormsModule
  ],
  templateUrl: './view-all-users.html',
  styleUrl: './view-all-users.css',
})
export class ViewAllUsers {



  users: AppUser[] = [];                 
  selectedUser: AppUser | null = null;   
  message: string = '';                  
  isError: boolean = false;             
  loading: boolean = false;              

  statusOptions = Object.values(Status); 

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers(); 
  }

  // Load all users from backend
  loadUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.loading = false;
      },
      error: () => {
        this.message = 'Failed to load users';
        this.isError = true;
        this.loading = false;
      },
    });
  }

  //Open user in edit form with password included
  // editUser(user: AppUser) {
  //   this.selectedUser = { ...user, password: user.password }; // copy with password
  //   this.message = '';
  // }

  //Open user in edit form without load password from DB
  editUser(user: AppUser) {
    this.selectedUser = { ...user, password: '' };
    this.message = '';
  }

  // Cancel edit
  cancelEdit() {
    this.selectedUser = null;
    this.message = '';
  }

  // Save updated user
  saveUser() {
    if (!this.selectedUser || !this.selectedUser.username || !this.selectedUser.email) {
      this.message = 'Username, Email are required!';
      this.isError = true;
      return;
    }

    this.userService.updateUser(this.selectedUser.id!, this.selectedUser).subscribe({
      next: () => {
        this.message = 'User updated successfully!';
        this.isError = false;
        this.selectedUser = null; 
        this.loadUsers();         
      },
      error: () => {
        this.message = 'Update failed. Please try again.';
        this.isError = true;
      },
    });
  }

  // Delete a user
  deleteUser(user: AppUser) {
    if (!confirm(`Are you sure you want to delete ${user.username}?`)) return;

    this.userService.deleteUser(user.id!).subscribe({
      next: (res) => {
        this.message = res;
        this.isError = false;
        this.loadUsers();
      },
      error: () => {
        this.message = 'Delete failed. Please try again.';
        this.isError = true;
      },
    });
  }


}
