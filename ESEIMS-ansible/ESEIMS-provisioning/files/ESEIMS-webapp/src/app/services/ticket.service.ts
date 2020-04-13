import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getTicketByUserId(userId) {
    const url = `/api/tickets-userId/${userId}`;
    return this.http.get(url)
  }

  checkTicketByUserId(ticketId, userId) {
    const params = new HttpParams()
      .set('ticketId', ticketId)
      .set('userId', userId);
    const url = `/api/ticketValidation`;
    return this.http.get(url, { params })
  }

  addTicket(ticket) {
    return this.http.post('/api/tickets', ticket)
  }

  editTicket(ticket) {
    const url = `/api/tickets/${ticket.id}`;
    return this.http.put(url, ticket);
  }

  deleteTicket(ticketId) {
    const url = `/api/tickets/${ticketId}`;
    return this.http.delete(url)
  }

  getComments(ticketId) {
    const url = `/api/comments/${ticketId}`;
    return this.http.get(url)
  }

  addComment(comment) {
    return this.http.post('/api/comments', comment);
  }

  deleteComments(ticketId) {
    const url = `/api/comments/${ticketId}`;
    return this.http.delete(url)
  }

}
