import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  loginUser(user) {
    return this.http.post('http://localhost:3000/api/login', user)
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

  registerUser(user) {
    return this.http.post('http://localhost:3000/api/register', user)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isAuthenticated() {
    return !!localStorage.getItem('token')
  }

}