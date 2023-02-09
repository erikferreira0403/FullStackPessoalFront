import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  isLoggedIn( user: User): Observable<User>{
    const url = "https://localhost:44318/login";
    return this.http.post<User>(url, user);
    
  }
}
