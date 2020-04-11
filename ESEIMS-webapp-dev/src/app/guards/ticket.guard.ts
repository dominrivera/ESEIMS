import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TicketService } from '../services/ticket.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class TicketGuard implements CanActivate {

  public access: string;

  constructor(private auth: AuthService, private router: Router, private ticketService: TicketService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    var urlId = route.paramMap.get('id');
    var currentUser = this.auth.getCurrentUser();
    return this.ticketService.checkTicketByUserId(urlId, currentUser.id).pipe(
      map(
        (data) => {
          if ((data == true) || (this.auth.isAdmin())) {
            return true;
          } else {
            this.router.navigate(['/**'])
            return false;
          }
        }
      )
    )
  }

}
