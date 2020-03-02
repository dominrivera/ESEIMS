import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { UserComponent } from './components/user/user.component';
import { AlarmComponent } from './components/alarm/alarm.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { TicketDetailsComponent } from './components/ticket/ticket-details/ticket-details.component';
import { TicketFormComponent } from './components/ticket/ticket-form/ticket-form.component';

import { UserService } from './services/user.service';
import { TicketService } from './services/ticket.service';
import { AlarmService } from './services/alarm.service';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service'

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { ProfileGuard } from './guards/profile.guard';
import { TicketGuard } from './guards/ticket.guard';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient]
      }
    })
  ],
  providers: [UserService, TicketService, AlarmService, AuthService, AuthGuard, AdminGuard, ProfileGuard, TicketGuard, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
