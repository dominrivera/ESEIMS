import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AlarmComponent } from './components/alarm/alarm.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { UserComponent } from './components/user/user.component';
import { TicketDetailsComponent } from './components/ticket/ticket-details/ticket-details.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';

import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'alarms', component: AlarmComponent, canActivate: [AuthGuard] },
  { path: 'dashboards', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'tickets', component: TicketComponent, canActivate: [AuthGuard] },
  { path: 'tickets/:id', component: TicketDetailsComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// Array of components. Add here new components
export const routingComponents = [
  HomeComponent,
  AlarmComponent,
  DashboardComponent,
  TicketComponent,
  TicketDetailsComponent,
  UserComponent,
  UserProfileComponent,
  LoginComponent,
  RegisterComponent,
  PagenotfoundComponent
];