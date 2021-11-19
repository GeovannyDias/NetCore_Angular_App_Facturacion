import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { AppPrimengModule } from 'src/app/app-primeng.module';
import { FormProductComponent } from './components/form-product/form-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductsComponent,
    ListProductComponent,
    FormProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppPrimengModule,
  ]
})
export class ProductsModule { }
