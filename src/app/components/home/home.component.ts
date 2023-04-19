import { User } from './../../models/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from 'src/app/dialogs/create-user/create-user.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  isLoggedIn = this.user.isLoggedIn;
  displayedColumns = ['id', 'name', 'password', 'role', 'actions'];
  listofusers: User[] = [];
  dataSource!: MatTableDataSource<User>;
  IsMantainer!: boolean;
  email: any;

  public users : User = {
    name: '',
    password: '',
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private user : UserService, public dialog: MatDialog) {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.email = localStorage.getItem('email')
  }

  ngOnInit(){
    this.CreateListOfusers();
    this.checkRole();
  }

  CreateListOfusers(){
    this.user.GetUser().subscribe(r => {
      this.listofusers = r;
      this.dataSource = new MatTableDataSource<User>(this.listofusers);
      this.dataSource.paginator = this.paginator;
    })
  }

  openDialogCreate(modo?: string) {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      data:  { modo: 'Adicionar' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.CreateListOfusers();
    });
  }

  openDialogOneUser(userid?: any) {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      data: { id : userid, modo: 'Editar'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.CreateListOfusers();
    });
  }

  deleteUser(id:number){
    this.user.DeleteUser(id).subscribe(() => {
      this.CreateListOfusers();})
  }

  checkRole(){
    let id = parseInt(this.email);
    this.user.GetOneUser(id).subscribe((r: any) => {
        this.users = r
        console.log(this.users)

        if(r.role == 0){
          this.IsMantainer = false
        } else {
          this.IsMantainer = true
        }
    });
  }
}
