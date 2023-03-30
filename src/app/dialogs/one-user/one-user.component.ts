import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-one-user',
  templateUrl: './one-user.component.html',
  styleUrls: ['./one-user.component.css']
})
export class OneUserComponent implements OnInit {

  @Input() id!: number;
  disclaimer = false;

  public showPassword: boolean = false;


  public users : User = {
    name: '',
    password: ''
    };
  constructor(private user : UserService, @Inject(MAT_DIALOG_DATA) public data: {id: number}) { }

  ngOnInit(): void {
    this.OneUser();
    }
  OneUser(){
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
  }}
