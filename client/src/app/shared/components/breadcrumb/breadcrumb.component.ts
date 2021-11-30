import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  items: MenuItem[];
  home: MenuItem;
  constructor() { }

  ngOnInit(): void {
    this.loadBreadcrumb();
  }

  loadBreadcrumb() {
    this.items = [
      { label: 'Computer' },
      { label: 'Notebook' },
      { label: 'Accessories' },
      { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi' },
      { label: 'Recent Files', icon: 'pi pi-download', routerLink: ['/products'], queryParams: { 'recent': 'true' } }
    ];

    this.home = { icon: 'pi pi-home', routerLink: ['/'] };
  }

}
