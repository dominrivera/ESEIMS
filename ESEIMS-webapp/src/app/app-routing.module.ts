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



const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'alarms', component: AlarmComponent },
  { path: 'dashboards', component: DashboardComponent },
  { path: 'tickets', component: TicketComponent },
  { path: 'users', component: UserComponent },
  //{ path: 'admin/list-books', component: ListBooksComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: '**', component: PagenotfoundComponent },
  //{ path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  //{ path: '**', component: Page404Component }
  // https://www.youtube.com/watch?v=jYcAO49PaCI
  // ejemplo -> { path: 'dashboard:/id', component: DetailsDashboardComponent}
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
  UserComponent,
  LoginComponent,
  RegisterComponent,
  PagenotfoundComponent
]