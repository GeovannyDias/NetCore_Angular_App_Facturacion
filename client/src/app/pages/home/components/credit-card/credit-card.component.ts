import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CreditCardI } from '../../models/card.interface';
import { CreditCardService } from '../../services/credit-card.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {
  myForm: FormGroup;
  private initForm() {
    return this.formBuilder.group({
      titular: ['', Validators.required],
      numberCard: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      expirationDate: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  dataCard: CreditCardI;
  eventUpdateSubs: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private creditCardService: CreditCardService,

  ) {
    this.myForm = this.initForm();
  }

  ngOnInit(): void {
    this.listenUpdateEvent();
  }

  // VALIDA LOS CAMPOS DEL FORMULARIO
  isValidField(field: string) {
    const validatedField = this.myForm.get(field);
    return (!validatedField.valid && validatedField.touched) ? 'is-invalid' :
      validatedField.touched ? 'is-valid' : '';
  }


  async onSave() {
    // console.log('Saved...', this.myForm.value);
    if (this.myForm.valid) {
      if (!this.dataCard) {
        this.postCreditCard();
      } else {
        this.validateCard();
      }
    } else {
      console.log('Data My Form not valid...');
    }
  }

  postCreditCard() {
    const data = this.myForm.value;
    this.creditCardService.postCreditCard(data).subscribe(res => {
      console.log('RES POST:', res);
      this.creditCardService.cardEventListener.emit('POST OK');
      this.toastr.success('Credit card added.', 'Excellent!', { closeButton: true });
      this.myForm.reset();
    });
  }

  validateCard() {
    this.dataCard.titular = this.myForm.value.titular;
    this.dataCard.numberCard = this.myForm.value.numberCard;
    this.dataCard.expirationDate = this.myForm.value.expirationDate;
    this.dataCard.cvv = this.myForm.value.cvv;
    this.updateCreditCard(this.dataCard);
  }

  updateCreditCard(card: CreditCardI) {
    console.log(card);
    this.creditCardService.updateCreditCards(card.id, card).subscribe(res => {
      // console.log('RES UPDATE:', res);
      this.creditCardService.cardEventListener.emit('UPDATE OK');
      this.toastr.success('Credit card updated.', 'Excellent!', { closeButton: true });
      this.myForm.reset();
      this.dataCard = null;
    });
  }

  listenUpdateEvent() {
    if (this.eventUpdateSubs) this.eventUpdateSubs.unsubscribe();
    this.eventUpdateSubs = this.creditCardService.updateEventListener.subscribe(data => {
      console.log('updateEventListener:');
      this.myForm.get('titular').setValue(data.titular);
      this.myForm.get('numberCard').setValue(data.numberCard);
      this.myForm.get('expirationDate').setValue(data.expirationDate);
      this.myForm.get('cvv').setValue(data.cvv);
      this.dataCard = data;
    });
  }

}
