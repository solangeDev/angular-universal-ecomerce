import { Component, OnInit } from '@angular/core';
import { linksInterface } from '@models/global-data';
import { GlobalDataService } from '@services/global-data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class FooterComponent implements OnInit {
  open: boolean = false;
  links: linksInterface[] = [];

  constructor(private globalDataService: GlobalDataService) {}

  loadGlobalData() {
    this.globalDataService.getGlobalData().subscribe((data) => {
      this.links = data.links;
    });
  }

  openTab() {
    this.open = !this.open;
  }

  ngOnInit() {
    this.loadGlobalData();
  }
}
