import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from 'src/app/dialogs/create-user/create-user.component';
import { OneUserComponent } from 'src/app/dialogs/one-user/one-user.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 
  isLoggedIn: boolean;

  displayedColumns = ['id', 'name', 'password', 'actions'];
  listofusers!: User[];
  id!: number;

  public users : User = {
  name: '',
  password: ''
  };

  constructor(private user : UserService, public dialog: MatDialog) { 
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  }

  ngOnInit(){
    this.isLoggedIn = this.user.isLoggedIn;

    this.user.GetUser().subscribe(r => {
      this.listofusers = r
      console.log(this.listofusers)
    })
  }

  openDialogCreate() {
    const dialogRef = this.dialog.open(CreateUserComponent);
  }


  openDialogOneUser() {
    const dialogRef = this.dialog.open(OneUserComponent);
  }
  OneUser(){
    this.user.GetOneUser(this.id).subscribe(r => console.log(r))
  }

  deleteUser(id:number){
    this.user.DeleteUser(id).subscribe(() => { 
      window.location.reload()});
  }

  
}

 
