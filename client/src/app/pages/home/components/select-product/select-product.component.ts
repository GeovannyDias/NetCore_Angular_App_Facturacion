import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductI } from 'src/app/pages/products/models/product.interface';
import { ProductService } from 'src/app/pages/products/services/product.service';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss']
})
export class SelectProductComponent implements OnInit {
  loading: boolean = true;
  dataProducts: ProductI[];

  constructor(
    private router: Router,
    private productService: ProductService,
  ) {
    // PERMITE NAVEGAR A UNA RUTA Y SE PUEDE AGREGAR MAS FUNCIONALIDAD
    // NO UTILIZADO (SE USA DIALOG-PRODUCT-COMPONENT)
    console.log('NO UTILIZADO (READING CONSTRUCTOR)');
   }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.dataProducts = data;
      this.loading = false;
    });
  }


  goToInvoice() {
    this.router.navigate(['invoice']);
  }

  goToProducts() {
    this.router.navigate(['products']);
  }

  selectProduct(product: ProductI) {
    console.log(product);
    localStorage.setItem('product', JSON.stringify(product));
    localStorage.setItem('select_product', 'true');
    this.router.navigate(['invoice']);
  }


}
