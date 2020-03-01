import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  constructor(protected http: HttpClient, private auth: AuthService) { }

  getAlarms() {
    return this.http.get('/api/alarms');
  }

}