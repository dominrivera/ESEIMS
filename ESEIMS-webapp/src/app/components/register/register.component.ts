import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerData = {}

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    console.log(this.registerData);
    this.auth.registerUser(this.registerData)
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
