import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData = {}

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    console.log(this.loginData);
    this.auth.loginUser(this.loginData)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res['accessToken'])
        this.router.navigate(['/dashboards'])
      },
      err => console.log(err)
    )
  }

}
