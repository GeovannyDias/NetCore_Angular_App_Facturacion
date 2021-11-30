import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: any;

  selectedState: any = null;

  states: any[] = [
    { name: "Arizona", code: "Arizona" },
    { name: "California", value: "California" },
    { name: "Florida", code: "Florida" },
    { name: "Ohio", code: "Ohio" },
    { name: "Washington", code: "Washington" }
  ];

  cities1: any[] = [];

  cities2: any[] = [];

  city1: any = null;

  city2: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loadRoutePath();
  }

  loadRoutePath() {

    this.route.data.subscribe(data => {
      console.log('Route 1: ', data);
    });

    // Way Two
    console.log('ROUTER 2:', this.router.config);
    console.log('ROUTER 3:', this.router.url);
  }

  deteteCard(id_card: number) {
    console.log('HOME:', id_card);
    this.data = id_card;
  }

}
