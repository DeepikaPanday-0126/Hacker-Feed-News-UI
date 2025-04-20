import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  newUser: User = {
    id: '',
    created: Date.now(),
    karma: 0,
    about: '',
    submitted: []
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  addUser(): void {
    this.userService.createUser(this.newUser).subscribe(() => this.loadUsers());
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(() => this.loadUsers());
  }
}
