import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlarmComponent } from './alarm/alarm.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TicketComponent } from './ticket/ticket.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';



const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'alarms', component: AlarmComponent },
  { path: 'dashboards', component: DashboardComponent },
  { path: 'tickets', component: TicketComponent },
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
  LoginComponent,
  RegisterComponent,
  PagenotfoundComponent
]