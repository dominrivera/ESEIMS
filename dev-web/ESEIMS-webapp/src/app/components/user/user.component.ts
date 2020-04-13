import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: any = [];
  dni: string;
  userByDNI: any = {};
  search: boolean = false;
  modalData: number;
  page: number = 1;
  deleteSuccess: boolean;

  constructor(protected userService: UserService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.search = false;
    this.userService.getUsers()
      .subscribe(
        (data) => {
          this.users = data;
        },
        (err) => {
          console.log(err);
          this.router.navigate(['/login'])
        }
      )
  }

  editUser(userId) {
    this.router.navigate(['/users', userId]);
  }

  deleteUser(userId) {
    this.userService.deleteUser(userId)
      .subscribe(
        (data) => {
          this.deleteSuccess = true;
          setTimeout(() => {
            this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/users']);
            });
          }, 2500);
        },
        (err) => {
          if (err) {
            this.deleteSuccess = false;
            setTimeout(() => {
              this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/users']);
              });
            }, 2500);
          }
        }
      )
  }

  sendModalData(userId) {
    this.modalData = userId;
  }

  searchByDNI(dni) {
    if (dni && dni.length == 9) {
      this.userService.getUserByDNI(dni)
        .subscribe(
          (data) => {
            this.search = true
            this.userByDNI = data[0]
          }
        );
    }
  }

  clearSearch() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/users']);
    });
  }

  sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("userTable");
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
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
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
