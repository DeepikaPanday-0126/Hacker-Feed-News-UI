import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  newUser = { id: '', karma: 0, about: '', created: Date.now(), submitted: [] };
  editRowId: string | null = null;
  editCache: any = {};
  userDisplayedColumns: string[] = ['id', 'karma', 'about', 'actions'];
  showAddRow: boolean=false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(data => this.users = data);
  }

  addUser() {
    if (!this.newUser.id.trim()) return;
    this.userService.createUser(this.newUser).subscribe(() => {
      this.getAllUsers();
      this.newUser = { id: '', karma: 0, about: '', created: Date.now(), submitted: [] };
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(() => this.getAllUsers());
  }

  startEdit(user: any) {
    this.editRowId = user.id;
    this.editCache = { ...user };
  }

  saveEdit() {
    this.userService.updateUser(this.editCache.id,this.editCache).subscribe(() => {
      this.editRowId = null;
      this.getAllUsers();
    });
  }

  cancelEdit() {
    this.editRowId = null;
    this.editCache = {};
  }

  

  cancelAdd() {
    this.newUser = { id: '', karma: 0, about: '', created: Date.now(), submitted: [] };
    this.showAddRow = false;
  }
}

