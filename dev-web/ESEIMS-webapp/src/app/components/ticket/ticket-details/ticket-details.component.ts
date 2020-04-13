import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {

  comments: any = [];
  newComment: any = {};
  ticket: any = {};
  ticketCreatorEmail: string;
  currentUser: any;
  currentUserRole: any;
  modalTicketId: number;
  commentSuccess: boolean;
  deleteSuccess: boolean;

  constructor(private route: ActivatedRoute, private ticketService: TicketService, private auth: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.currentUser = this.auth.getCurrentUser();
    this.currentUserRole = this.currentUser.role;

    this.ticketService.getTicket(id)
      .subscribe(
        (data) => {
          if (!data[0]) {
            this.router.navigate(['/**'])
          } else {
            this.ticket = data[0];
            var creatorId = this.ticket.creatorId;
            this.userService.getUser(creatorId)
              .subscribe(
                (data) => {
                  this.ticketCreatorEmail = data[0].email;
                },
                (err) => {
                  console.log(err);
                }
              )
          }
        },
        (err) => {
          console.log(err);
          this.router.navigate(['/tickets'])
        }
      )

    this.ticketService.getComments(id)
      .subscribe(
        (data) => {
          this.comments = data
        },
        (err) => {
          console.log(err);
          this.router.navigate(['/tickets'])
        }
      )

  }

  addComment(ticketId) {
    this.newComment.ticketId = ticketId;
    this.newComment.creator = this.currentUser.name + ' ' + this.currentUser.surname;
    if (this.newComment.message) {
      this.ticketService.addComment(this.newComment)
        .subscribe(
          (data) => {
            this.commentSuccess = true;
            this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/tickets', this.newComment.ticketId]);
            });
          },
          (err) => {
            console.log(err);
            this.commentSuccess = false;
          }
        )
    } else {
      this.commentSuccess = false;
    }
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

  reOpenTicket(ticket) {
    ticket.status = 'in progress';
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

}
