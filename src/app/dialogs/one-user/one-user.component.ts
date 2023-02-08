import { Component, Input, OnInit } from '@angular/core';
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

  public users : User = {
    name: '',
    password: ''
    };
  constructor(private user : UserService) { }

  ngOnInit(): void {
  }
  OneUser(){
    this.user.GetOneUser(this.id).subscribe(r => this.users = r)
  }
  EditUser(){
    if(this.users.name != "" && this.users.password != ""){

    this.user.PutUser(this.id, this.users).subscribe(() =>
    window.location.reload())} else {  this.disclaimer = true
    } 
  }
}
