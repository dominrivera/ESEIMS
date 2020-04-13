import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData: any = {};
  loginSuccess: boolean;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    console.log(this.loginData);
    this.auth.loginUser(this.loginData)
      .subscribe(
        (data) => {
          localStorage.setItem('token', data['accessToken'])
          this.router.navigate(['/'])
        },
        (err) => {
          console.log(err)
          this.loginSuccess = false;
        }
      )
  }

}
