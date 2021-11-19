import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductI } from 'src/app/pages/products/models/product.interface';
import { ProductService } from 'src/app/pages/products/services/product.service';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss']
})
export class DialogProductComponent implements OnInit {
  loading: boolean = true;
  dataProducts: ProductI[];

  constructor(
    private productService: ProductService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private router: Router,
  ) {
    console.log('DialogProductComponent → Dialog');
  }

  ngOnInit(): void {
    this.getProductsByState();
  }

  selectProduct(product: any) {
    this.ref.close(product);
  }

  getProductsByState() {
    this.productService.getProductsByState(true).subscribe(data => {
      this.dataProducts = data;
      this.loading = false;
    });
  }


  // goToProducts(){
  //   this.router.navigate(['products']);
  // }


}
