import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  tickets: any = [];
  selectedStatus: string = 'open';
  currentUser: any = {};
  currentUserName: string;
  modalTicketId: number;
  page: number = 1;
  deleteSuccess: boolean;

  constructor(protected ticketService: TicketService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser()
    this.currentUserName = this.currentUser.name + ' ' + this.currentUser.surname;

    if (this.currentUser.role == 'admin') {
      this.ticketService.getTickets()
        .subscribe(
          (data) => {
            this.tickets = data;
          },
          (err) => {
            console.log(err);
            this.router.navigate(['login'])
          }
        )
    } else {
      this.ticketService.getTicketByUserId(this.currentUser.id)
        .subscribe(
          (data) => {
            this.tickets = data;
          },
          (err) => {
            console.log(err);
            this.router.navigate(['login'])
          }
        )
    }

  }

  openTicket() {
    this.router.navigate(['/ticket-form'])
  }

  takeTicket(ticket) {
    ticket.assignment = this.currentUserName;
    ticket.status = 'in progress';
    this.ticketService.editTicket(ticket)
      .subscribe(
        (data) => {
        },
        (err) => {
          console.log(err);
        }
      )
  }

  filterTicket(status) {
    this.selectedStatus = status;
  }

  selectTicket(ticketId) {
    this.router.navigate(['/tickets', ticketId])
    // scroll up in the new route
    window.scrollTo(0, 0)
  }

  closeTicket(ticket) {
    ticket.status = 'closed';
    this.ticketService.editTicket(ticket)
      .subscribe(
        (data) => {
        },
        (err) => {
          console.log(err);
          this.router.navigate(['login'])
        }
      )
  }

  deleteTicket(ticketId) {
    this.ticketService.deleteTicket(ticketId)
      .subscribe(
        (data) => {
          this.deleteSuccess = true;
          setTimeout(() => {
            this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/tickets']);
            });
          }, 2500);
        },
        (err) => {
          if (err) {
            this.deleteSuccess = false;
            setTimeout(() => {
              this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/tickets']);
              });
            }, 2500);
          }
        }
      )
  }

  deleteComment(ticketId) {
    this.ticketService.deleteComments(ticketId)
      .subscribe(
        (data) => {
        },
        (err) => {
          console.log(err);

        }
      )
  }

  sendModalData(ticket) {
    var ticketId = ticket.id
    this.modalTicketId = ticketId;
  }

  sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("ticketTable");
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
