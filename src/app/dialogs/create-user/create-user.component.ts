import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  disclaimer = false;
  id!: number;

  public users : User = {
    name: '',
    password: ''
    };

  constructor(private user : UserService) { }

  PostUsers(){
    if(this.users.name != "" && this.users.password != "")
     this.user.PostUser(this.users).subscribe(() => {
      return window.location.reload();
  }); else {  this.disclaimer = true
  }
  }
}
