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

  constructor(protected ticketService: TicketService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
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

  takeTicket(ticket) {
    var currentUser = this.auth.getCurrentUser()
    ticket.assignment = currentUser.name + ' ' + currentUser.surname;
    ticket.status = 'In progress';
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
  
  selectTicket(ticketId) {
    this.router.navigate(['/tickets', ticketId])
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
