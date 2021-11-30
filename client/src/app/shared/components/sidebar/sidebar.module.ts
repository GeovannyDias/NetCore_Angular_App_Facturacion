import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [SidebarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], /** ADD THIS → Ionicons v5.5.2 **/ 
})
export class SidebarModule { }
