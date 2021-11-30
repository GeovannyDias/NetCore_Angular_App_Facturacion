import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CustomerI } from '../../models/customer.interface';
import { CustomerService } from '../../services/customer.service';

// DynamicDialog
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FormCustomerComponent } from '../form-customer/form-customer.component';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {

  dataCustomers: CustomerI[];
  listSubs: Subscription;
  loading: boolean = true;

  ref: DynamicDialogRef;

  constructor(
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router,
    public dialogService: DialogService,
    public messageService: MessageService,

  ) {

  }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    if (this.listSubs) this.listSubs.unsubscribe();
    this.listSubs = this.customerService.getCustomers().subscribe(data => {
      this.dataCustomers = data;
      this.loading = false;
    });
  }



  updateCustomer(customer: CustomerI) {
    localStorage.setItem('customerUpdate', JSON.stringify(customer));
    this.formCustomerDialog('Update Customer', customer);
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(res => {
      this.getCustomers();
      this.toastr.success('Customer deleted.', 'Excellent!', { closeButton: true });
    });
  }


  // goToCustomerForm() {
  //   this.router.navigate(['form-customer']);
  // }

  goToHome() {
    this.router.navigate(['home']);
  }


  // FORM CUSTOMER (DIALOG - MODAL)
  formCustomerDialog(header: string, customer: CustomerI) {
    // const screen = window.screen.width; // Tamaño de patalla fisica del dispositivo
    // console.log('Screen:', screen); // var screen: Screen → palabra reservada

    const x = window.matchMedia("(max-width: 768px)");
    let widthScreen = '50%';
    if (x.matches) { // If media query matches
      widthScreen = '100%';
    } else {
      widthScreen = '50%';
    }

    // LISTENER MEDIA QUERY
    // x.addEventListener('change', (e) => {
    //   console.log(e.matches);
    //   if (e.matches) { // If media query matches
    //     widthScreen = '100%';
    //   } else {
    //     widthScreen = '70%';
    //   }
    // }); // Attach listener function on state changes

    this.ref = this.dialogService.open(FormCustomerComponent, {
      header: header,
      // width: '70%',
      width: widthScreen,
      contentStyle: { "height": "100%", "overflow": "auto" },
      baseZIndex: 10000,
      dismissableMask: false, // click - close dismiss (Default: false)
      styleClass: 'p-dialog-customer', // media query global width: 100% mobile
      data: customer,
    });

    this.ref.onClose.subscribe((data: any) => {
      // console.log(data);
      if (data) {
        // this.messageService.add({ severity: 'info', summary: 'Customer', detail: 'Saved' });
        this.getCustomers();
      }
    });
  }


}
