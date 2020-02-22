import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(protected http: HttpClient, private auth: AuthService) { }

  getTickets() {
    return this.http.get('/api/tickets');
  }

  getTicket(ticketId) {
    const url = `/api/tickets/${ticketId}`;
    return this.http.get(url)
  }

  editTicket(ticket) {
    const url = `/api/tickets/${ticket.id}`;
    const token = this.auth.getToken()
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    return this.http.put(url, ticket, httpOptions);
  }

  deleteTicket(ticketId) {
    const url = `/api/tickets/${ticketId}`;
    const token = this.auth.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    
    return this.http.delete(url, httpOptions)
  }

  getComments(ticketId) {
    const url = `/api/comments/${ticketId}`;
    return this.http.get(url)
  }

  addComment(comment) {
    return this.http.post('/api/comments', comment);
  }

}
