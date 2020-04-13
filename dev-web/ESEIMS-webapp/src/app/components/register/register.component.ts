import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerData: any = {};
  validations: any = {
    'name': false,
    'surname': false,
    'email': false,
    'email_exists': false,
    'password': false,
    'dni': false
  };
  registerSuccess: boolean = false;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    this.auth.registerUser(this.registerData)
      .subscribe(
        (data) => {
          this.registerSuccess = true;
          if (this.auth.isAuthenticated()) {
            setTimeout(() => {
              this.router.navigate(['/users', data]);
            }, 2500);
          } else {
            setTimeout(() => {
              this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/login']);
              })
            }, 3000);
          }
        },
        (err) => {
          if (err.error == 'email_exists') {
            this.validations.email_exists = true;
          } else {
            err.error.forEach(error => {
              if (error == 'name') {
                this.validations.name = true;
              } else if (error == 'surname') {
                this.validations.surname = true;
              } else if (error == 'email') {
                this.validations.email = true;
              } else if (error == 'password') {
                this.validations.password = true;
              } else if (error == 'dni') {
                this.validations.dni = true;
              }
            });
          }
        }
      )
  }

}