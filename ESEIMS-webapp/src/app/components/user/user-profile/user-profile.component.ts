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
  currentUserRole: any;
  edit: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id'));
    var currentUser = this.auth.getCurrentUser();
    this.currentUserRole = currentUser.role;
    this.userService.getUser(this.userId)
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

  editUser() {
    this.edit = true;
  }

  saveUser() {
    this.userService.editUser(this.user)
    .subscribe(
      (data) => {
        this.edit == false;
        // show message user correctly edited
        console.log(data)
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/users', this.userId]);
        });
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            // show message cannot edit
            console.log(err)
          }
        }
      }
    )
  }

}
