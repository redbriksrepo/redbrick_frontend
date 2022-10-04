import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface locationsInCities {
  city: string,
  locations: Array<string>
}

@Component({
  selector: 'app-location-in-city',
  templateUrl: './location-in-city.component.html',
  styleUrls: ['./location-in-city.component.scss']
})
export class LocationInCityComponent implements OnInit {

  city!: string;
  locationsInCity: locationsInCities[] = [];
  tempArr: any[] = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.route.snapshot.params?.['city']) {
      this.city = this.route.snapshot.params?.['city'];
    }
    debugger;
    // this.locationsInCity = this.locationsInCities.find((object) => {
    //   object.city === this.city
    // })
    // console.log(this.locationsInCity);
    // let a = this.locationsInCity.find((object) => {
    //   object.city === this.city;
    // })
    // console.log(a)
    // console.log(this.city)



    this.loadLocationInCities();


  }


  loadLocationInCities() {

    debugger;
    this.locationsInCities.forEach((element) => {
      debugger;
      if (element.city == this.city) {

        this.locationsInCity.push(element);
        console.log(element);

      }
    });
  }

  locationsInCities = [
    {
      city: 'Pune',
      locations: [
        'Shivaji Nagar',
        'Kharadi',
        'Banner',
        'Kothrud'
      ]
    },
    {
      city: 'Mumbai',
      locations: [
        'Andheri',
        'Bandra',
        'Borivali',
        'Goregaon'
      ]
    },
    {
      city: 'Hyderabad',
      locations: [
        'Ameerpet',
        'Sanathnagar',
        'Khairatabad',
        'Musheerabad'
      ]
    },
    {
      city: 'Delhi',
      locations: [
        'Lajpat Nagar',
        'Hauz Khas',
        'Nehru Place',
        'Mayur Vihar'
      ]
    }
  ];

  //   locationsInCity = [
  //     { city: 'Pune' ,

  //     locations: [
  //             'Andheri',
  //             'Bandra',

  //           ]

  //   },
  //     { city: 'Mumbai' },

  // ];




}
