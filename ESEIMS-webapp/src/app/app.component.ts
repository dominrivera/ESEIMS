import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ESEIMS-webapp';
  defaultLang = 'es';

  constructor(public auth: AuthService, private router: Router, private translate: TranslateService) {
    this.translate.setDefaultLang(this.defaultLang);
  }

  showProfile() {
    var currentUser = this.auth.getCurrentUser()
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/users', currentUser.id]);
    })
  }

  changeLanguage(language) {
    this.defaultLang = language;
    this.translate.use(language);
  }

}
