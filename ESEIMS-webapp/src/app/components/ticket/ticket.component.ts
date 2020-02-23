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
  ticket: any = {};
  selectedStatus: string = 'all';
  currentUser: any = {};
  currentUserName: string;

  constructor(protected ticketService: TicketService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser()
    this.currentUserName = this.currentUser.name + ' ' + this.currentUser.surname;
    this.ticketService.getTickets()
      .subscribe(
        res => {
          this.tickets = res;
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              this.router.navigate(['login'])
            }
          }
        }
      );
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

}
