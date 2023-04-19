import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent  {
  disclaimer = false;
  showPassword = false;

  public users : User = {
    name: '',
    password: '',
  }

  constructor(
    private user : UserService,
    @Inject(MAT_DIALOG_DATA) public data: {id: number, modo: string},
    private dialogRef: MatDialogRef<CreateUserComponent>) { }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.data.modo === 'Editar' ? this.GetUser() : null
  }

  PostUsers(){
    let role: any = this.users.role
    this.users.role = parseInt(role)

    if(this.users.name != "" && this.users.password != "" )
     this.user.PostUser(this.users).subscribe(() => {
      this.dialogRef.close();
    });
    else {  this.disclaimer = true }
  }

  Send(){
    this.data.modo === 'Editar' ? this.EditUser() : this.PostUsers()
  }

  GetUser(): any {
    this.user.GetOneUser(this.data.id).subscribe(r => this.users = r)
  }

  EditUser(){
    let role: any = this.users.role
    this.users.role = parseInt(role)

    if(this.users.name != "" && this.users.password != ""  && this.users.role != null){
    this.user.PutUser(this.data.id, this.users).subscribe(() =>{
      this.dialogRef.close()}
    )} else {  this.disclaimer = true
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
