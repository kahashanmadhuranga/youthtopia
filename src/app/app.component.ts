import {Component, OnInit} from '@angular/core';
import {animate, keyframes, transition, trigger} from '@angular/animations';
import * as kf from './keyframes';
// @ts-ignore
import data from './../assets/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('cardAnimator', [
      transition('* => fadeOutTopLeft', animate(1000, keyframes(kf.fadeOutTopLeft))),
      transition('* => fadeOutTopRight', animate(1000, keyframes(kf.fadeOutTopRight))),
    ])
  ]
})
export class AppComponent implements OnInit {

  animationState: string;
  featuredProducts: Array<any> = [];
  products: Array<any> = [];
  animationStateArray: Array<{ animationState: string }> = [];
  count = 9;


  constructor() {
  }

  async ngOnInit() {
    this.featuredProducts = data.featuredProducts;
    await this.setProducts();
  }

  swipeLeft(event, state, index) {
    console.log(event);
    if (!this.animationStateArray[index].animationState) {
      this.animationStateArray[index].animationState = state;
      this.removeCard(index);
    }
  }

  swipeRight(event, state, index) {
    console.log(this.animationStateArray[index].animationState);
    if (!this.animationStateArray[index].animationState) {
      this.animationStateArray[index].animationState = state;
      this.removeCard(index);
    }
  }

  removeCard(index: number) {
    setTimeout(() => {
      this.animationStateArray.splice(index, 1);
      this.products.splice(index, 1);
    }, 750);
  }

  setProducts() {
    return new Promise(resolve => {
      this.animationStateArray = [];
      this.products = data.products;
      this.products.forEach(item => {
        this.animationStateArray.push({animationState: null});
      });
      resolve();
    });
  }

  async reload() {
    location.reload();
    await this.setProducts();
  }
}
