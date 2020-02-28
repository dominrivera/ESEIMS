import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TicketService } from '../services/ticket.service';

@Injectable()
export class TicketGuard implements CanActivate {

  tickets: any = [];
  access: boolean = false;

  constructor(private auth: AuthService, private router: Router, private ticketService: TicketService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var urlId = route.paramMap.get('id');
    var currentUser = this.auth.getCurrentUser();
    this.ticketService.getTicketByUserId(currentUser.id)
      .subscribe(
        (data) => {
          this.tickets = data;
          var i = 0;
          this.tickets.forEach(ticket => {
            if (ticket.id == urlId) {
              i++;
            }
          });
          console.log(i);
          if (i > 0) {
            this.access = true;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    console.log(this.access);

    if (this.auth.isAdmin()) {
      return true
    } else if (this.access == true) {
      return true
    } else {
      this.router.navigate(['/**'])
      return false
    }
  }

}
