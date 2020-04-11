import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  constructor(protected http: HttpClient, private auth: AuthService) { }

  getAlarms() {
    return this.http.get('/api/alarms');
  }

  editAlarm(alarm) {
    const url = `/api/alarms/${alarm.id}`;
    const token = this.auth.getToken()
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.put(url, alarm, httpOptions);
  }

  deleteAlarm(alarmId) {
    const url = `/api/alarms/${alarmId}`;
    const token = this.auth.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.delete(url, httpOptions)
  }

}