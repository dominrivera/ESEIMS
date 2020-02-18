import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected http: HttpClient) { }

  getUser(userId) {
    return this.http.get('http://localhost:3000/api/users:id', userId)
  }

  getUsers() {
    return this.http.get('http://localhost:3000/api/users');
  }
}
