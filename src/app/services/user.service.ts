import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn: boolean;
  email!: User;


  UsersUrl = 'https://localhost:44318/Users'

  constructor(private http: HttpClient) {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  GetUser(): Observable<any[]> {
    return this.http.get<any[]>(this.UsersUrl)
  }
  GetOneUser(id: number): Observable<User>{
    const url = `${this.UsersUrl}/${id}`
    return this.http.get<User>(url)
  }
  PostUser(User: User): Observable<User>{
    return this.http.post<User>(this.UsersUrl, User)
  }
  DeleteUser(id: number): Observable<User>{
    const url = `${this.UsersUrl}/${id}`
    return this.http.delete<User>(url)
  }
  PutUser(id: number, data: User): Observable<User>{
    const url = `${this.UsersUrl}/${id}`
    return this.http.put<User>(url, data)
  }
  PostLogin( user: User): Observable<User>{
    const url = "https://localhost:44318/login";
    return this.http.post<User>(url, user);
  }

  login(user: User) {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    this.userEmail(user)
  }

  logout(){
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('email')
  }

  userEmail(user: any){
    localStorage.setItem('email',  user.id)
    console.log(this.email)
  }
}
