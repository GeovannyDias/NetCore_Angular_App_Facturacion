import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductI } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})

export class ListProductComponent implements OnInit {
  listProducts: any[];
  listSubs: Subscription;

  dataProducts: ProductI[];
  loading: boolean = true;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.getCreditCards();
  }

  getCreditCards() {
    if (this.listSubs) this.listSubs.unsubscribe();
    this.listSubs = this.productService.getProducts().subscribe(data => {
      this.listProducts = data;
      this.dataProducts = data;
      this.loading = false;
    });
  }



  updateCreditCard(product: ProductI) {
    localStorage.setItem('productUpdate', JSON.stringify(product));
    this.goToProductForm();
  }

  deleteCreditCard(id: number) {
    this.productService.deleteProduct(id).subscribe(res => {
      this.getCreditCards();
      this.toastr.success('Product deleted.', 'Excellent!', { closeButton: true });
    });
  }


  goToProductForm() {
    this.router.navigate(['form-product']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }


}
