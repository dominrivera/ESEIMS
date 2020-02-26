import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TicketService } from '../services/ticket.service';

@Injectable()
export class TicketGuard implements CanActivate {

  tickets: any = [];
  thi

  constructor(private auth: AuthService, private router: Router, private ticketService: TicketService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var urlId = parseInt(route.paramMap.get('id'));
    var currentUser = this.auth.getCurrentUser()
    this.ticketService.getTicketByUserId(currentUser.id)
    .subscribe(
      (data) => {
        this.tickets = data;
      }
    );
    this.tickets.forEach(ticket => {
      
    });

    if (this.auth.isAdmin()) {
      return true
    } else if (currentUser.id) {
      return true
    } else {
      this.router.navigate(['/**'])
      return false
    }
  }

}
