import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { HttpErrorResponse } from '@angular/common/http';
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
            if (err instanceof HttpErrorResponse) {
              if (err.status == 401) {
                this.router.navigate(['login'])
              }
            }
          }
        )
    } else {
      this.ticketService.getTicketByUserId(this.currentUser.id)
        .subscribe(
          (data) => {
            this.tickets = data;
          },
          (err) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status == 401) {
                this.router.navigate(['login'])
              }
            }
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
          console.log(data)
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            console.log(err);

          }
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
          console.log(data);
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              this.router.navigate(['login'])
            }
          }
        }
      )
  }

  deleteTicket(ticketId) {
    this.ticketService.deleteTicket(ticketId)
      .subscribe(
        (data) => {
          console.log(data)
          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/tickets']);
          });
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              this.router.navigate(['/tickets'])
            }
          }
        }
      )
  }

  deleteComment(ticketId) {
    this.ticketService.deleteComments(ticketId)
      .subscribe(
        (data) => {
          console.log(data)
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

}
