import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  tickets: any = [];

  constructor(protected ticketService: TicketService, private router: Router) { }

  ngOnInit() {}

  showTickets() {
    this.ticketService.getTickets()
    .subscribe(
      res => {
        this.tickets = res;
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401){
            this.router.navigate(['login'])
          }
        }
      }
    );
  }

}
