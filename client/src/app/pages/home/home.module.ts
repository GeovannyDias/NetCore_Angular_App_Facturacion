import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListCreditCardComponent } from './components/list-credit-card/list-credit-card.component';
import { AppPrimengModule } from 'src/app/app-primeng.module';
import { ListInvoiceComponent } from './components/list-invoice/list-invoice.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { SelectProductComponent } from './components/select-product/select-product.component';
import { DialogProductComponent } from './components/dialog-product/dialog-product.component';


@NgModule({
  declarations: [
    HomeComponent,
    CreditCardComponent,
    ListCreditCardComponent,
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
  ]
})
export class HomeModule { }
