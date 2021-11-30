import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomerI } from '../models/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  server: string = environment.server;
  api_url: string = 'api/customer/';

  constructor(
    private http: HttpClient,
  ) { }

  // GET - All
  getCustomers() {
    const url = this.server + this.api_url;
    return this.http.get<CustomerI[]>(url);
  }

  // GET - All (Filter by state)
  getCustomersByState(state: boolean) {
    const url = this.server + this.api_url + 'state/';
    return this.http.get<CustomerI[]>(url + state);
  }

  // GET By Id
  getCustomerById(id: number) {
    const url = this.server + this.api_url;
    return this.http.get<CustomerI>(url + id);
  }

  // POST
  postCustomer(data: CustomerI) {
    const url = this.server + this.api_url;
    return this.http.post<CustomerI>(url, data);
  }

  // PUT
  updateCustomer(id: number, data: CustomerI) {
    const url = this.server + this.api_url;
    return this.http.put<CustomerI>(url + id, data);
  }

  // DELETE
  deleteCustomer(id: number) {
    const url = this.server + this.api_url;
    return this.http.delete(url + id);
  }

}
