import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { eseims_host_overview } from 'src/grafana_dashboards';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  url: string;
  urlSafe: SafeResourceUrl;

  // We use DomSanitizer to fix security errors when using a variable containing an url inside the iframe html
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.url = eseims_host_overview;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
