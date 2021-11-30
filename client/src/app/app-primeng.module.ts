import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components PrimeNG
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TabViewModule } from 'primeng/tabview';
// import { InputNumberModule } from 'primeng/inputnumber';
// import { InputMaskModule } from 'primeng/inputmask';

const myModules = [
  TableModule,
  ToastModule,
  CalendarModule,
  SliderModule,
  MultiSelectModule,
  ContextMenuModule,
  DialogModule,
  ButtonModule,
  DropdownModule,
  ProgressBarModule,
  InputTextModule,
  DynamicDialogModule,
  BreadcrumbModule,
  TabViewModule,
  // InputNumberModule,
  // InputMaskModule,
];

const myServices = [
  DialogService,
  MessageService,
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // myModules, // Opcional
  ],
  exports: [
    myModules,
  ],
  providers: [myServices],
})
export class AppPrimengModule { }
