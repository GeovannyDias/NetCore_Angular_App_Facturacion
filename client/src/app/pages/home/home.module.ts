import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListCreditCardComponent } from './components/list-credit-card/list-credit-card.component';


@NgModule({
  declarations: [
    HomeComponent,
    CreditCardComponent,
    ListCreditCardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
