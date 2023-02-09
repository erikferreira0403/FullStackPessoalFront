import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  isLoggedIn: boolean;
    
  constructor(private user: UserService) {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
   }

  ngOnInit(): void {
    this.isLoggedIn = this.user.isLoggedIn;

  }
}
