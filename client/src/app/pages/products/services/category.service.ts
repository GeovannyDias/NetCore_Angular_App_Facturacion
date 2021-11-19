import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryI } from '../models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  server: string = environment.server;
  api_url: string = 'api/category/';

  constructor(
    private http: HttpClient,
  ) { }
  
  // GET - All
  getCategories() {
    const url = this.server + this.api_url;
    return this.http.get<CategoryI[]>(url);
  }
  
  // GET By Id
  getCategoryById(id: number) {
    const url = this.server + this.api_url;
    return this.http.get<CategoryI>(url + id);
  }

  // POST
  postCategory(data: CategoryI) {
    const url = this.server + this.api_url;
    return this.http.post<CategoryI>(url, data);
  }

  // PUT
  updateCategory(id: number, data: CategoryI) {
    const url = this.server + this.api_url;
    return this.http.put<CategoryI>(url + id, data);
  }

  // DELETE
  deleteCategory(id: number) {
    const url = this.server + this.api_url;
    return this.http.delete(url+ id);
  }

}
