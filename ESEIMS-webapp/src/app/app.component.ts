import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ESEIMS-webapp';

  constructor(private auth: AuthService, private router: Router){}

  showProfile() {
    var currentUser = this.auth.getCurrentUser()
    this.router.navigate(['/users', currentUser.id])
  }

}
