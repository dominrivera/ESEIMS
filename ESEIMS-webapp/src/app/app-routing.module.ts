import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'dashboard', component: DashboardComponent },
  //{ path: 'admin/list-books', component: ListBooksComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
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
export const routingComponents = [HomeComponent, DashboardComponent, LoginComponent, RegisterComponent]