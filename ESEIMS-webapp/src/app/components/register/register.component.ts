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
    'password': false,
    'dni': false
  };

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    this.auth.registerUser(this.registerData)
      .subscribe(
        (data) => {
          console.log(data)
          //this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          //  this.router.navigate(['/register']);
          //});
        },
        (err) => {
          console.log(err.error);
          err.error.forEach(error => {
            console.log(error);
            if(error=='name'){
              this.validations.name = true;
            } else if(error=='surname') {
              this.validations.surname = true;
            } else if(error=='email') {
              this.validations.email = true;
            } else if(error=='password') {
              this.validations.password = true;
            } else if(error=='dni') {
              this.validations.dni = true;
            }

          /*  switch (error) {
              case error=='name':
                this.validations.name = true;
                break;
              case error=='surname':
                this.validations.surname = true;
                break;
              case error=='email':
                this.validations.email = true;
                break;
              case error=='password':
                this.validations.password = true;
                break;
              case error='dni':
                this.validations.dni = true;
                break;
            }*/
          });
        }
      )
  }

}
