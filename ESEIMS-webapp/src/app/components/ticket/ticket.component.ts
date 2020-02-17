import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  tickets: any = [];

  constructor(protected ticketService: TicketService) { }

  ngOnInit() {
    this.ticketService.getTickets()
    .subscribe(
      (data) => {
        this.tickets = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
