import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean;

  constructor() {
    // recuperar o estado de autenticação do localStorage
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  receiveDataFromChild(event:any) {
     if (event.data = true)
      this.login()
  }
  
  login() {
    // mude o valor de isLoggedIn para true e armazene no localStorage
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
  }

  title = 'frontend';

}
