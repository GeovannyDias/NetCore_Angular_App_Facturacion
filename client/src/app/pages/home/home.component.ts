import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: any;
  constructor() { }

  ngOnInit(): void {
  }

  deteteCard(id_card: number) {
    console.log('HOME:', id_card);
    this.data = id_card;
  }

}
