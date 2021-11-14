import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { CreditCardI } from '../models/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  listCards: EventEmitter<CreditCardI[]> = new EventEmitter<CreditCardI[]>(); // Observable (NO UTILIZADO)
  cardEventListener = new EventEmitter<string>(); // Observable (Evento para llamar api lista de tarjera)
  updateEventListener = new EventEmitter<CreditCardI>(); // Observable (Evento para llamar api lista de tarjera)

  server: string = 'https://localhost:44352/';
  api_url: string = 'api/card/';

  constructor(
    private http: HttpClient,
  ) { }

  // GET - All
  getCreditCards() {
    const url = this.server + this.api_url;
    return this.http.get<CreditCardI[]>(url);
  }
  
  // GET By Id
  getCreditCardById(id: number) {
    const url = this.server + this.api_url;
    return this.http.get<CreditCardI>(url + id);
  }

  // POST
  postCreditCard(data: CreditCardI) {
    const url = this.server + this.api_url;
    return this.http.post<CreditCardI>(url, data);
  }

  // PUT
  updateCreditCards(id: number, data: CreditCardI) {
    const url = this.server + this.api_url;
    return this.http.put<CreditCardI>(url + id, data);
  }

  // DELETE
  deleteCreditCards(id: number) {
    const url = this.server + this.api_url;
    return this.http.delete(url+ id);
  }





}
