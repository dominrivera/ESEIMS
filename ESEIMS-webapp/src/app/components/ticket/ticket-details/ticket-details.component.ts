import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {

  comments: any = [];
  newComment: any = {};
  ticket: any = {};
  currentUser: any;
  currentUserRole: any;

  constructor(private route: ActivatedRoute, private ticketService: TicketService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.currentUser = this.auth.getCurrentUser();
    this.currentUserRole = this.currentUser.role;

    this.ticketService.getTicket(id)
      .subscribe(
        (data) => {
          this.ticket = data[0];
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              this.router.navigate(['login'])
            }
          }
        }
      )

    this.ticketService.getComments(id)
      .subscribe(
        (data) => {
          this.comments = data
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

  addComment(ticketId) {
    this.newComment.ticketId = ticketId;
    this.newComment.creator = this.currentUser.name + ' ' + this.currentUser.surname;
    this.ticketService.addComment(this.newComment)
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/tickets', this.newComment.ticketId]);
          });
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

  reOpenTicket(ticket) {
    ticket.status = 'in progress';
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

}
