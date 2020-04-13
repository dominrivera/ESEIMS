import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected http: HttpClient, private auth: AuthService) { }

  getUsers() {
    return this.http.get('/api/users')
  }

  getUser(userId) {
    const url = `/api/users/${userId}`;
    return this.http.get(url)
  }

  getUserByDNI(dni) {
    const url = `/api/user/${dni}`;
    return this.http.get(url)
  }

  editUser(user) {
    const url = `/api/users/${user.id}`;
    return this.http.put(url, user)
  }

  deleteUser(userId) {
    const url = `/api/users/${userId}`;
    return this.http.delete(url)
  }

}
