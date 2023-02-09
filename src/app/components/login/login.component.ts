import { UserService } from 'src/app/services/user.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() dataToParent = new EventEmitter<any>();
  isLoggedIn: boolean;


  disclaimer = false;
  check = false

  public users : User = {
    name: '',
    password: ''
    };
    
  constructor(private user: UserService, private router: Router) {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

   }

  ngOnInit(): void {
    this.isLoggedIn = this.user.isLoggedIn;

  }

  LoginUser(){
    if(this.users.name == "" && this.users.password == "")
    this.disclaimer = true;
    this.check = false

    if(this.users.name != "" && this.users.password != ""){
    this.user.PostLogin(this.users).subscribe(
    (r) => {
      this.dataToParent.emit({data : true})
    this.router.navigate(['/Home'])
    
    },
    (e) => {
      console.log(e), 
      this.check = true
    })
    }
  }
}