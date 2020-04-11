import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit {

  ticket: any = {};
  currentUserName: string;
  createSuccess: boolean;

  constructor(private auth: AuthService, private ticketService: TicketService, private router: Router) { }

  ngOnInit() {
  }

  addTicket(ticket) {
    var currentUser = this.auth.getCurrentUser()
    ticket.creator = currentUser.name + ' ' + currentUser.surname;
    ticket.creatorId = currentUser.id;

    if (ticket.title && ticket.description) {
      this.ticketService.addTicket(ticket)
        .subscribe(
          (data) => {
            this.createSuccess = true;
            setTimeout(() => {
              this.router.navigate(['/tickets', data]);
            }, 2000);
          },
          (err) => {
            console.log(err);
            this.createSuccess = false;
          }
        )
    } else {
      this.createSuccess = false;
    }
  }

}
