import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post('http://localhost:3000/api/register', user);
  }

  loginUser(user) {
    console.log(user);
    return this.http.post('http://localhost:3000/api/login', user)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isAuthenticated() {
    return !!localStorage.getItem('token')
  }

}