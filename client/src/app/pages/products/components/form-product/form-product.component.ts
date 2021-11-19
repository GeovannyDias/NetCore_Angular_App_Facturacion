import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryI } from '../../models/category.interface';
import { ProductI } from '../../models/product.interface';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {
  myForm: FormGroup;
  private initForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      price: ['', [Validators.required]],
      state: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  dataProduct: ProductI;
  dataCategories: CategoryI[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {
    this.myForm = this.initForm();
  }

  ngOnInit(): void {
    this.getCategories();
    this.loadDataStorege();
  }

  // VALIDA LOS CAMPOS DEL FORMULARIO
  isValidField(field: string) {
    const validatedField = this.myForm.get(field);
    return (!validatedField.valid && validatedField.touched) ? 'is-invalid' :
      validatedField.touched ? 'is-valid' : '';
  }

  async getCategories() {
    await this.categoryService.getCategories().toPromise().then(data => {
      this.dataCategories = data;
    }).catch(error => {
      // console.log('ERROR:', error);
      const er = error?.error?.title;
      this.toastr.error(er ? er : 'An error has occurred.', 'Error', { closeButton: true });
    });
  }

  async onSave() {
    // console.log('Saved...', this.myForm.value);
    if (this.myForm.valid) {
      if (!this.dataProduct) {
        this.postProduct();
      } else {
        this.validateProduct();
      }
    } else {
      console.log('Data My Form not valid...');
    }
  }


  postProduct() {
    const data = this.myForm.value;
    this.productService.postProduct(data).subscribe(res => {
      this.toastr.success('Product added.', 'Excellent!', { closeButton: true });
      this.myForm.reset();
      this.goToProducts();
    });
  }

  validateProduct() {
    this.dataProduct.name = this.myForm.value.name;
    this.dataProduct.description = this.myForm.value.description;
    this.dataProduct.price = this.myForm.value.price;
    this.dataProduct.categoryId = this.myForm.value.categoryId;
    this.dataProduct.state = this.myForm.value.state;
    this.updateProduct(this.dataProduct);
  }

  updateProduct(product: ProductI) {
    this.productService.updateProduct(product.id, product).subscribe(() => {
      this.toastr.success('Product updated.', 'Excellent!', { closeButton: true });
      this.myForm.reset();
      this.dataProduct = null;
      this.goToProducts();
    });
  }

  loadDataStorege() {
    this.dataProduct = JSON.parse(localStorage.getItem('productUpdate'));
    if (this.dataProduct) {
      this.myForm.get('name').setValue(this.dataProduct.name);
      this.myForm.get('description').setValue(this.dataProduct.description);
      this.myForm.get('price').setValue(this.dataProduct.price);
      this.myForm.get('categoryId').setValue(this.dataProduct.categoryId);
      this.myForm.get('state').setValue(this.dataProduct.state);
    } else {
      this.dataProduct = null;
    }
  }

  selectState(event) {
    const value = event.target.value;
    if (value === 'true') {
      this.myForm.get('state').setValue(true);
    } else if (value === 'false') {
      this.myForm.get('state').setValue(false);
    } else {
      this.myForm.get('state').setValue('');
    }
  }

  selectCategory(event) {
    const value = event.target.value;
    if (value !== '' || value !== 0) {
      this.myForm.get('categoryId').setValue(+value);
    } else {
      this.myForm.get('categoryId').setValue('');
    }
  }


  goToProducts() {
    this.router.navigate(['products']);
    localStorage.removeItem('productUpdate');
  }

}
