import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductI } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  server: string = environment.server;
  api_url: string = 'api/product/';

  constructor(
    private http: HttpClient,
  ) { }

  // GET - All
  getProducts() {
    const url = this.server + this.api_url;
    return this.http.get<ProductI[]>(url);
  }

  // GET - All (Filter by state)
  getProductsByState(state: boolean) {
    const url = this.server + this.api_url + 'state/';
    return this.http.get<ProductI[]>(url + state);
  }

  // GET By Id
  getProductById(id: number) {
    const url = this.server + this.api_url;
    return this.http.get<ProductI>(url + id);
  }

  // POST
  postProduct(data: ProductI) {
    const url = this.server + this.api_url;
    return this.http.post<ProductI>(url, data);
  }

  // PUT
  updateProduct(id: number, data: ProductI) {
    const url = this.server + this.api_url;
    return this.http.put<ProductI>(url + id, data);
  }

  // DELETE
  deleteProduct(id: number) {
    const url = this.server + this.api_url;
    return this.http.delete(url + id);
  }


}
