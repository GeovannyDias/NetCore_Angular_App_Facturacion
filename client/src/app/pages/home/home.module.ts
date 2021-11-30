import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppPrimengModule } from 'src/app/app-primeng.module';
import { ListInvoiceComponent } from './components/list-invoice/list-invoice.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { SelectProductComponent } from './components/select-product/select-product.component';
import { DialogProductComponent } from './components/dialog-product/dialog-product.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeComponent,
    ListInvoiceComponent,
    InvoiceComponent,
    AddProductComponent,
    SelectProductComponent,
    DialogProductComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppPrimengModule,
    RouterModule,
  ]
})
export class HomeModule { }
