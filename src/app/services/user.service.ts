import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  UsersUrl = 'https://localhost:44318/Users'

  constructor(private http: HttpClient) { }

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
}
