import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Only Components
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

// Modules with Components
import { NavbarModule } from './navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { AppPrimengModule } from 'src/app/app-primeng.module';
import { RouterModule } from '@angular/router';

const myComponents = [
  PageNotFoundComponent,
  BreadcrumbComponent,
];

const myModules = [
  NavbarModule,
  SidebarModule,
];


@NgModule({
  declarations: [
    myComponents,
  ],
  imports: [
    CommonModule,
    AppPrimengModule,
    RouterModule,
  ],
  exports: [
    myComponents,
    myModules,
  ]
})
export class SharedModule { }
