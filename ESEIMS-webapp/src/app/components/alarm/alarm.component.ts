import { Component, OnInit } from '@angular/core';
import { AlarmService } from 'src/app/services/alarm.service';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent implements OnInit {

  alarms: any = [];
  page: number = 1;

  constructor(private alarmService: AlarmService) { }

  ngOnInit() {
    this.alarmService.getAlarms()
    .subscribe(
      (data) => {
        console.log(data);
        this.alarms = data;
      },
      (err) => {
        console.log(err)
      }
    )
  }

}
