import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(protected http: HttpClient, private auth: AuthService) { }

  getTickets() {
    return this.http.get('http://localhost:3000/api/tickets');
  }

  getTicket(ticketId) {
    return this.http.get('http://localhost:3000/api/tickets/:id', ticketId)
  }

  editTicket(ticket) {
    return this.http.put('http://localhost:3000/api/tickets', ticket)
  }

  deleteTicket(ticketId) {
    const url = `http://localhost:3000/api/tickets/${ticketId}`;
    const token = this.auth.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    
    return this.http.delete(url, httpOptions)
  }
}
