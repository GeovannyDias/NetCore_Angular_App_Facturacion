import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomerI } from '../../models/customer.interface';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.scss']
})
export class FormCustomerComponent implements OnInit {
  private isEmail = /\S+@\S+\.\S+/; // Expresión regular para validar email
  // private isNumber = '[0-9]{10}'; // Expresión regular para ingresar solo números hasta 10 caracteres
  private isNumber2 = /^\d+$/; // permite solo números → OK

  myForm: FormGroup;
  private initForm() {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      ci: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      phone: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern(this.isNumber2)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.isEmail)]],
      address: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  dataCustomer: CustomerI;
  states: any[];

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private toastr: ToastrService,
  ) {
    this.myForm = this.initForm();
    this.states = [
      { name: 'Activate', value: true },
      { name: 'Deactivate', value: false }
    ];
    this.dataCustomer = this.config.data;
  }

  ngOnInit(): void {
    this.loadDataStorage();
  }

  closeDialog() {
    this.ref.close({ save: true });
    // this.ref.close();
  }

  // VALIDA LOS CAMPOS DEL FORMULARIO (Bootstrap)
  // isValidField(field: string) {
  //   const validatedField = this.myForm.get(field);
  //   return (!validatedField.valid && validatedField.touched) ? 'is-invalid' :
  //     validatedField.touched ? 'is-valid' : '';
  // }


  // VALIDA LOS CAMPOS DEL FORMULARIO (PrimeNG)
  ngValidField(field: string) {
    const validatedField = this.myForm.get(field);
    return (!validatedField.valid && validatedField.touched) ? 'ng-invalid ng-dirty' :
      validatedField.touched ? 'ng-valid' : '';
  }



  async onSave() {
    // console.log('Saved...', this.myForm.value);
    if (this.myForm.valid) {
      if (!this.dataCustomer) {
        this.postCustomer();
      } else {
        this.validateCustomer();
      }
    } else {
      console.log('Data My Form not valid...');
    }
  }


  postCustomer() {
    const data = this.myForm.value;
    this.customerService.postCustomer(data).subscribe(res => {
      this.toastr.success('Customer added.', 'Excellent!', { closeButton: true });
      this.myForm.reset();
      this.closeDialog();
    });
  }

  validateCustomer() {
    this.dataCustomer.firstName = this.myForm.value.firstName;
    this.dataCustomer.lastName = this.myForm.value.lastName;
    this.dataCustomer.ci = this.myForm.value.ci;
    this.dataCustomer.phone = this.myForm.value.phone;
    this.dataCustomer.email = this.myForm.value.email;
    this.dataCustomer.address = this.myForm.value.address;
    this.dataCustomer.state = this.myForm.value.state;

    this.updateCustomer(this.dataCustomer);
  }

  updateCustomer(customer: CustomerI) {
    this.customerService.updateCustomer(customer.id, customer).subscribe(() => {
      this.toastr.success('Customer updated.', 'Excellent!', { closeButton: true });
      this.myForm.reset();
      this.dataCustomer = null;
      this.closeDialog();
    });
  }

  loadDataStorage() {
    // this.dataCustomer = JSON.parse(localStorage.getItem('customerUpdate'));
    if (this.dataCustomer) {
      // this.myForm.get('firstName').setValue(this.dataCustomer.firstName);
      // this.myForm.get('lastName').setValue(this.dataCustomer.lastName);
      // this.myForm.get('ci').setValue(this.dataCustomer.ci);
      // this.myForm.get('phone').setValue(this.dataCustomer.phone);
      // this.myForm.get('email').setValue(this.dataCustomer.email);
      // this.myForm.get('address').setValue(this.dataCustomer.address);
      // this.myForm.get('state').setValue(this.dataCustomer.state);

      this.myForm.patchValue({
        firstName: this.dataCustomer.firstName,
        lastName: this.dataCustomer.lastName,
        ci: this.dataCustomer.ci,
        phone: this.dataCustomer.phone,
        email: this.dataCustomer.email,
        address: this.dataCustomer.address,
        state: this.dataCustomer.state,
      }); // recibe un objeto de opciones


    } else {
      this.dataCustomer = null;
    }
  }



  // // Cargar los valores a editar
  // private initValuesForm() {
  //   this.myForm.patchValue({
  //     id: this.post.id,
  //     titlePost: this.post.titlePost,
  //     contentPost: this.post.contentPost,
  //     tagsPost: this.post.tagsPost
  //   }); // recibe un objeto de opciones
  // }





}
