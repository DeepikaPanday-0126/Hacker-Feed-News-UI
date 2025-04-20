import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit,AfterViewInit {
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
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  
  getAllUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.dataSource.data = this.users;
    });
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

