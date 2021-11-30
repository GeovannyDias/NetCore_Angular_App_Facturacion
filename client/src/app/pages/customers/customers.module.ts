import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { FormCustomerComponent } from './components/form-customer/form-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppPrimengModule } from 'src/app/app-primeng.module';


@NgModule({
  declarations: [
    CustomersComponent,
    ListCustomerComponent,
    FormCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppPrimengModule,
  ]
})
export class CustomersModule { }
