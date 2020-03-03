import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: any = [];
  dni: string;
  searchDNI: string;
  search: boolean = false;
  modalData: number;

  constructor(protected userService: UserService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.search = false;
    this.userService.getUsers()
      .subscribe(
        (data) => {
          this.users = data;
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              this.router.navigate(['/login'])
            }
          }
        }
      )
  }

  editUser(userId) {
    this.router.navigate(['/users', userId]);
  }
  
  // TODO: show message when user is deleted.
  deleteUser(userId) {
    this.userService.deleteUser(userId)
      .subscribe(
        (data) => {
          console.log(data)
          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/users']);
          });
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              this.router.navigate(['/users'])
            }
          }
        }
      )
  }

  sendModalData(userId) {
    this.modalData = userId;
  }

  searchByDNI(dni) {
    if (dni) {
      this.search = true;
      this.searchDNI = dni;
    } else {
      this.search = false;
    }
  }

  clearSearch() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/users']);
    });
  }

}
