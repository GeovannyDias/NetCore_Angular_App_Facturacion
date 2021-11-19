import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from '../../services/invoice.service';

// DynamicDialog
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DialogProductComponent } from '../dialog-product/dialog-product.component';

import { ProductI } from 'src/app/pages/products/models/product.interface';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  date: number = Date.now();
  myForm: FormGroup;
  createFormGroup() {
    return new FormGroup({
      code: new FormControl(Date.now().toString()),
      invoiceDate: new FormControl(new Date()), // Optional (View Front)
      customerId: new FormControl(1, [Validators.required]),
      state: new FormControl(true, Validators.required),
      invoiceDetails: this.formBuilder.array([], Validators.required),
    });
  }
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  ref: DynamicDialogRef;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private invoiceService: InvoiceService,
    private toastr: ToastrService,
    public dialogService: DialogService,
    public messageService: MessageService,
  ) {
    this.myForm = this.createFormGroup();
    // this.getDinamicos;
    // console.log(this.getDinamicos.value);
  }

  ngOnInit(): void {
    this.date = Date.now();
    // this.validataAddDinamico(); // With Path
    this.loadFormStorage(); // With Modal
  }

  // VALIDA LOS CAMPOS DEL FORMULARIO
  isValidField(field: string) {
    const validatedField = this.myForm.get(field);
    return !validatedField.valid && validatedField.touched ?
      'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }


  // GET DIMANIC FIELDS - ARRAY (Se optine data de Array Dinamico)
  get getDinamicos() {
    return this.myForm.get('invoiceDetails') as FormArray;
  }

  // REMOVE DINAMIC FIELD SELECTED
  removeDinamico(index: number) {
    const control = <FormArray>this.myForm.controls['invoiceDetails'];
    control.removeAt(index);
    this.onCalculate();
  }





  // --------------------------------------------------------------------
  // APP - LOGICA SIN MODAL (MEDIANTE COMPONENTE Y PATH)
  // --------------------------------------------------------------------

  // validataAddDinamico() {
  //   const select_product = localStorage.getItem('select_product'); // true or null
  //   const product = JSON.parse(localStorage.getItem('product'));
  //   this.loadFormStorage(); // Storage
  //   if (select_product && product) {
  //     const control = <FormArray>this.myForm.controls['invoiceDetails'];
  //     control.push(
  //       this.formBuilder.group({
  //         productId: product.id,
  //         name: product.name,
  //         amount: 1,
  //         unitPrice: product.price
  //       })
  //     );
  //     this.onCalculate();
  //     this.removeStorage();
  //   } else {
  //   }
  // }



  async loadFormStorage() {
    const myForm = JSON.parse(localStorage.getItem('myForm'));
    if (myForm) {
      this.myForm.get('code').setValue(Date.now().toString());
      this.myForm.get('invoiceDate').setValue(new Date());
      this.myForm.get('customerId').setValue(myForm.customerId);
      // this.myForm.value.invoiceDetails.push(myForm.invoiceDetails);
      const control = <FormArray>this.myForm.controls['invoiceDetails'];
      myForm.invoiceDetails.map(detail => {
        control.push(
          this.formBuilder.group({
            productId: detail.productId,
            name: detail.name,
            amount: detail.amount,
            unitPrice: detail.unitPrice
          })
        );
      });
    }
    this.onCalculate();
  }


  // // SELECT PRODUCT
  // addDinamico() {
  //   localStorage.setItem('myForm', JSON.stringify(this.myForm.value));
  //   this.removeStorage();
  //   this.router.navigate(['select-product']);
  // }


  // removeStorage() {
  //   localStorage.removeItem('select_product');
  //   localStorage.removeItem('product');
  // }


  // --------------------------------------------------------------------
  // APP
  // --------------------------------------------------------------------

  // VALIDATE AMOUNT
  validateAmount(event: number, index: number) {
    let control = <FormArray>this.myForm.controls['invoiceDetails'];
    if (event <= 0) {
      control.controls[index].get('amount').setValue(1);
    }
    this.onCalculate();
  }

  // CALCULATE SUBTOTAL, IVA, TOTAL
  onCalculate() {
    let subtotal = 0;
    let iva = 0;
    let total = 0;
    for (const product of this.myForm.value.invoiceDetails) {
      subtotal += product.amount * product.unitPrice;
    }
    iva = subtotal * 0.12;
    total = subtotal + iva;
    this.subtotal = subtotal;
    this.iva = iva;
    this.total = total;
    localStorage.setItem('myForm', JSON.stringify(this.myForm.value));
  }


  // SAVE INVOICE
  generateInvoice() {
    // delete this.myForm.value.invoiceDate;
    this.myForm.get('code').setValue(Date.now().toString());
    this.myForm.get('invoiceDate').setValue(new Date());
    const data = this.myForm.value;
    this.invoiceService.postInvoice(data).subscribe(res => {
      this.myForm.reset();
      this.toastr.success('Invoice added.', 'Excellent!', { closeButton: true });
      this.router.navigate(['home']);
      localStorage.removeItem('myForm');
    }, error => {
      console.log('Error:', error);
      const er = error?.error?.title;
      this.toastr.error(er ? er : 'An error has occurred.', 'Error', { closeButton: true });
    });

  }


  // SELECT PRODUCT (DIALOG - MODAL)
  selectProductDialog() {
    this.ref = this.dialogService.open(DialogProductComponent, {
      header: 'Choose a Product',
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      dismissableMask: false, // click - close dismiss (Default: false)
    });

    this.ref.onClose.subscribe((product: ProductI) => {
      if (product) {
        console.log('close', product);
        this.productSelected(product);
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
      }
    });
  }

  productSelected(product: ProductI) {
    const control = <FormArray>this.myForm.controls['invoiceDetails'];
    control.push(
      this.formBuilder.group({
        productId: product.id,
        name: product.name,
        amount: 1,
        unitPrice: product.price
      })
    );
    this.onCalculate();
  }

  goToHome() {
    this.router.navigateByUrl('home');
  }

}
