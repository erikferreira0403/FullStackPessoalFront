import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  isLoggedIn: boolean;
  constructor(private user: UserService) {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

   }


  ngOnInit(){
    this.isLoggedIn = this.user.isLoggedIn;

  }

}
