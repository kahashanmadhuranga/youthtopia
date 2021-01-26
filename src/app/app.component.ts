import {Component, OnInit} from '@angular/core';
// @ts-ignore
import data from './../assets/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Youthtpoia';

  featuredProducts: Array<any> = [];

  constructor() {
  }

  ngOnInit(): void {
    this.featuredProducts = data.featuredProducts;
  }
}
