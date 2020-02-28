import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  loginUser(user) {
    return this.http.post('/api/login', user)
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

  registerUser(user) {
    return this.http.post('/api/register', user)
  }

  getToken() {
    return localStorage.getItem('token')
  }

//  checkTokenValidity() {
//    if (this.getToken() == undefined) {
//      localStorage.removeItem('token')
//      this.router.navigate(['/login'])
//    }
//  }

  isAuthenticated() {
    return !!localStorage.getItem('token')
  }

  getCurrentUser() {
    var token = this.getToken()
    var decoded = jwt_decode(token);
    return decoded
  }

  isAdmin() {
    var currentUser = this.getCurrentUser();
    if (currentUser.role == 'user') {
      return false;
    }
    return true;
  }

}
