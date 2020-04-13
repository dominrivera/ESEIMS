import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
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
  newPassword: string = '';
  modalData: number;
  validations: any = {
    'name': false,
    'surname': false,
    'email': false,
    'email_exists': false,
    'password': false,
    'dni': false
  };
  deleteSuccess: boolean;

  constructor(private route: ActivatedRoute, private userService: UserService, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id'));
    //var currentUser = this.auth.getCurrentUser();
    //this.currentUserRole = currentUser.role;
    this.userService.getUser(this.userId)
      .subscribe(
        (data) => {
          if (!data[0]) {
            this.router.navigate(['/**'])
          } else {
            this.user = data[0];
          }
        },
        (err) => {
          console.log(err);
          this.router.navigate(['login'])
        }
      )
  }

  editUser() {
    this.edit = true;
  }

  saveUser() {
    // If user types password we send the new password to update it
    if (this.newPassword != '') {
      this.user.password = this.newPassword;
    }
    this.userService.editUser(this.user)
      .subscribe(
        (data) => {
          this.edit == false;
          // show message user correctly edited
          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/users', this.userId]);
          });
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

  deleteUser(userId) {
    this.userService.deleteUser(userId)
      .subscribe(
        (data) => {
          this.deleteSuccess = true;
          setTimeout(() => {
            this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/users']);
            });
          }, 2500);
        },
        (err) => {
          if (err) {
            this.deleteSuccess = false;
            setTimeout(() => {
              this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/users']);
              });
            }, 2500);
          }
        }
      )
  }

  sendModalData(userId) {
    this.modalData = userId;
  }

}
