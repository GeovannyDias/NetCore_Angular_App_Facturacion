import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { AppPrimengModule } from 'src/app/app-primeng.module';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    AppPrimengModule,
  ],
  exports: [NavbarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], /** ADD THIS → Ionicons v5.5.2 **/
})
export class NavbarModule { }
