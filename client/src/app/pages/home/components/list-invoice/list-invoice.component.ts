import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceI } from '../../models/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';


@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.scss']
})
export class ListInvoiceComponent implements OnInit {
  loading: boolean = true;
  dataInvoice: InvoiceI[];

  constructor(
    private router: Router,
    private invoiceService: InvoiceService,
  ) { }

  ngOnInit(): void {
    this.getInvoice();
  }


  getInvoice() {
    this.invoiceService.getInvoices().subscribe(data => {
      this.dataInvoice = data;
      this.loading = false;
    });

    // Total + Iva (Se guarda en BackEnd)
    // if (this.dataInvoice) {
    //   this.dataInvoice.forEach(
    //     invoice => (invoice.total = (invoice.total + (invoice.total * 0.12)))
    //   );
    // }
  }


  goToInvoice() {
    this.removeStorage();
    this.router.navigate(['invoice']);
  }

  goToProducts() {
    this.removeStorage();
    this.router.navigate(['products']);
  }

  removeStorage() {
    localStorage.removeItem('select_product');
    localStorage.removeItem('product');
    localStorage.removeItem('myForm');
  }





}
