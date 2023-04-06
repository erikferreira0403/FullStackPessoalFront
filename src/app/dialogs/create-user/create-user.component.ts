import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent  {
  disclaimer = false;
  id!: number;
  showPassword: boolean = false;


  public users : User = {
    name: '',
    password: ''
    };

  constructor(private user : UserService, @Inject(MAT_DIALOG_DATA) public data: {id: number, modo: string}) { }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    if (this.data.modo === 'editar') {
      this.GetUser();
    }
  }

  PostUsers(){
    if(this.users.name != "" && this.users.password != "")
     this.user.PostUser(this.users).subscribe(() => {
      return window.location.reload();
    }); else {  this.disclaimer = true
    }
  }

  Send(){
    if (this.data.modo === 'Editar') {
      this.EditUser();
    } else if (this.data.modo === 'Adicionar') {
      this.PostUsers();
    }
  }

  GetUser(){
    this.user.GetOneUser(this.data.id).subscribe(r => this.users = r)
  }

  EditUser(){
    if(this.users.name != "" && this.users.password != ""){

    this.user.PutUser(this.data.id, this.users).subscribe(() =>
    window.location.reload())} else {  this.disclaimer = true
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
