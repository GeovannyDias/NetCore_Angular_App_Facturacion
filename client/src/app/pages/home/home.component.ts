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


    const arr = [-1, -2, -3, -4, -5, -6];

    var max = Math.max(...arr);
    var min = Math.min(...arr);
    console.log('MAX:', max);
    console.log('MIN:', min);

    const arr2 = [-5, -4, -3, 3, 5, 6, 7];

    const negativos = arr2.filter(a => a < 0);
    const positivos = arr2.filter(a => a > 0);
    console.log('Negativos:', negativos);
    console.log('Positivos:', positivos);

    let n = -1;
    console.log('Postive1:', n = -n);
    console.log('Postive2:', Math.abs(n));

    console.log(arr2);
    const result = arr2.reduce((a, b) => {
      const aux = Math.abs(a) < Math.abs(b) ? a : b;
      console.log('a:', a, ', b:', b, ' = AUX:', aux);
      return aux; // Valor anterior que se conserva
    });

    console.log('RESULT:', result);

    const geo1 = {
      name: 'Geo',
      edad: '11'
    }

    console.log('KEYS:', Object.keys(geo1));



    /*
    function computeClosestToZero(ts) {
    // Write your code here
    // To debug: console.error('Debug messages...');
    if(ts.length === 0){
            return 0;
        } else {
            if(ts.length >= 0 && ts.length <= 10000){
                const tsSort = ts.sort((a, b) => a - b);
                const negative = tsSort.filter(a => a < 0);
                const positive = tsSort.filter(a => a > 0);

                if(negative.length > 0 && positive.length > 0) {
                    const negCero = Math.max(...negative);
                    const posCero = Math.min(...positive);
                    const negCeroAbs = Math.abs(negCero);
        
                    if(negCeroAbs === posCero){
                        return posCero;
                    } else if(negCeroAbs > posCero) {
                        return posCero;
                    } else if(posCero > negCeroAbs) {
                        return negCero;
                    }
                }

                if(negative.length > 0 && positive.length === 0) {
                    const negCero = Math.max(...negative);
                    return negCero;
                }

                if(negative.length === 0 && positive.length > 0) {
                    const posCero = Math.min(...positive);
                    return posCero;
                }
    
               
            }
        }
    
    return -1;
}
        
        return -1;
    }


    OTHER:

    function computeClosestToZero(ts) {
    // Write your code here
    // To debug: console.error('Debug messages...');
    if (ts.length === 0) {
        return 0;
    }

    const tsSort = ts.sort((a, b) => a - b);

    return tsSort.reduce((a, b) => {
        const aux = Math.abs(a) < Math.abs(b) ? a : b;
        return aux;
    });
}

    
    */


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
