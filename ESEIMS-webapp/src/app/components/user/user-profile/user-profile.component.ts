import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userId: number;
  user: any = {};
  currentUserId: any;

  constructor(private route: ActivatedRoute, private userService: UserService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(id)
    this.userService.getUser(id)
      .subscribe(
        (data) => {
          console.log(data)
          this.user = data[0];
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              this.router.navigate(['login'])
            }
          }
        }
      )

  }

}
