import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InvoiceI } from '../models/invoice.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  server: string = environment.server;
  api_url: string = 'api/invoice/';

  constructor(
    private http: HttpClient,
  ) { }

  // GET - All
  getInvoices() {
    const url = this.server + this.api_url;
    return this.http.get<InvoiceI[]>(url);
  }

  // GET By Id
  getInvoiceById(id: number) {
    const url = this.server + this.api_url;
    return this.http.get<InvoiceI>(url + id);
  }

  // POST
  postInvoice(data: InvoiceI) {
    const url = this.server + this.api_url;
    return this.http.post<InvoiceI>(url, data);
  }

  // PUT
  updateInvoice(id: number, data: InvoiceI) {
    const url = this.server + this.api_url;
    return this.http.put<InvoiceI>(url + id, data);
  }

  // DELETE
  deleteInvoice(id: number) {
    const url = this.server + this.api_url;
    return this.http.delete(url + id);
  }

}
