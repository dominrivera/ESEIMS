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
    return this.http.put(url, alarm);
  }

  deleteAlarm(alarmId) {
    const url = `/api/alarms/${alarmId}`;
    return this.http.delete(url)
  }

}