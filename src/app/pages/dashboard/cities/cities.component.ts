import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  constructor() { }

  cities = ['Pune','Delhi','Mumbai','Hydrabad','Kota'];

  ngOnInit(): void {
  }

}
