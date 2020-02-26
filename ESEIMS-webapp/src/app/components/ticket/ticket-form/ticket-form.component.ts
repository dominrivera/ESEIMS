import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TicketService } from 'src/app/services/ticket.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit {

  ticket: any = {};
  currentUserName: string;

  constructor(private auth: AuthService, private ticketService: TicketService, private router: Router) { }

  ngOnInit() {
  }

  addTicket(ticket) {
    var currentUser = this.auth.getCurrentUser()
    ticket.creator = currentUser.name + ' ' + currentUser.surname;
    ticket.creatorId = currentUser.id;
    
    this.ticketService.addTicket(ticket)
    .subscribe(
      (data) => {
        console.log(data);
       // this.router.navigate(['/tickets', data]);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            console.log('error');
          }
        }
      }
    )
  }

}
