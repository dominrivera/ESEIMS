import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected http: HttpClient, private auth: AuthService) { }

  getUsers() {
    return this.http.get('http://localhost:3000/api/users')
  }

  getUser(userId) {
    const url = `http://localhost:3000/api/users/${userId}`;
    return this.http.get(url)
  }

  editUser(user) {
    return this.http.put('http://localhost:3000/api/users', user)
  }

  deleteUser(userId) {
    const url = `http://localhost:3000/api/users/${userId}`;
    const token = this.auth.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    
    return this.http.delete(url, httpOptions)
  }

  getCurrentUser() {
    
  }

}
