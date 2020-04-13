import { Component, OnInit } from '@angular/core';
import { AlarmService } from 'src/app/services/alarm.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent implements OnInit {

  alarms: any = [];
  page: number = 1;
  selectedStatus: string = 'open';
  currentUser: any = {};
  currentUserName: string;
  deleteSuccess: boolean;
  modalAlarmId

  constructor(private alarmService: AlarmService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser()
    this.currentUserName = this.currentUser.name + ' ' + this.currentUser.surname;

    if (this.currentUser.role == 'admin') {
      this.alarmService.getAlarms()
        .subscribe(
          (data) => {
            this.alarms = data;
          },
          (err) => {
          }
        )
    } else {
      this.router.navigate(['/**']);
    }
  }

  // Showing in table alarms by status
  filterAlarm(status) {
    this.selectedStatus = status;
  }

  // Assign alarm yourself
  takeAlarm(alarm) {
    alarm.assignment = this.currentUserName;
    alarm.status = 'in progress';
    this.alarmService.editAlarm(alarm)
      .subscribe(
        (data) => {
        },
        (err) => {
        }
      )
  }

  closeAlarm(alarm) {
    alarm.status = 'closed';
    this.alarmService.editAlarm(alarm)
      .subscribe(
        (data) => {
        },
        (err) => {
        }
      )
  }

  deleteAlarm(alarmId) {
    this.alarmService.deleteAlarm(alarmId)
      .subscribe(
        (data) => {
          this.deleteSuccess = true;
          setTimeout(() => {
            this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/alarms']);
            });
          }, 2500);
        },
        (err) => {
          if (err) {
            this.deleteSuccess = false;
            setTimeout(() => {
              this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/alarms']);
              });
            }, 2500);
          }
        }
      )
  }

  // Send data about the element we want to remove
  sendModalData(alarm) {
    var alarmId = alarm.id
    this.modalAlarmId = alarmId;
  }

  // Function for table sorting
  sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("alarmTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("td")[n];
        y = rows[i + 1].getElementsByTagName("td")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

}
