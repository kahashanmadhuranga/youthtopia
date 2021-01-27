import {Component, OnInit} from '@angular/core';
import {animate, keyframes, transition, trigger} from '@angular/animations';
import * as kf from './keyframes';
// @ts-ignore
import data from './../assets/data.json';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('cardAnimator', [
      transition('* => fadeOutTopLeft', animate(1500, keyframes(kf.fadeOutTopLeft))),
      transition('* => fadeOutTopRight', animate(1500, keyframes(kf.fadeOutTopRight))),
    ])
  ]
})
export class AppComponent implements OnInit {

  animationState: string;
  featuredProducts: Array<any> = [];
  products: Array<any> = [];
  animationStateArray: Array<{ animationState: string }> = [];
  count = 0;

  likedItem: Array<{ image: string, title: string, description: string }> = [];


  constructor(private spinner: NgxSpinnerService) {
  }

  async ngOnInit() {
    this.spinner.show();
    this.featuredProducts = data.featuredProducts;
    await this.setProducts();
    setTimeout(async () => {
      await this.viewOnlyTopCard();
    });
    setTimeout(() => {
      this.resize(this.products.length - 1);
      this.spinner.hide();
    }, 2000);
  }

  swipeLeft(event, state, index, element: HTMLElement) {
    this.anim(index);
    this.resize(index - 1);
    if (!this.animationStateArray[index].animationState) {
      element.style.display = 'block';
      this.animationStateArray[index].animationState = state;
      this.setLikedItem(index);
      this.removeCard(index);
    }
  }

  swipeRight(event, state, index, element: HTMLElement) {
    this.anim(index);
    this.resize(index - 1);
    if (!this.animationStateArray[index].animationState) {
      element.style.display = 'block';
      this.animationStateArray[index].animationState = state;
      this.removeCard(index);
    }
  }

  anim(index) {
    if (index > 0) {
      const element = document.getElementById('custom-card-' + (index - 1)) as HTMLElement;
      element.style.display = 'block';
    }
  }

  setLikedItem(index) {
    this.likedItem.push(this.products[index]);
    localStorage.setItem('likedItem', JSON.stringify(this.likedItem));
    this.count++;
  }

  removeCard(index: number) {
    setTimeout(() => {
      this.animationStateArray.splice(index, 1);
      this.products.splice(index, 1);
    }, 1150);
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

  async resize(index, event?) {
    const likedItem = document.getElementById('liked-item') as HTMLElement;
    if (index > -1) {
      console.log('a');
      const image = document.getElementById('image-' + index) as HTMLImageElement;
      const description = document.getElementById('description-' + index) as HTMLElement;
      likedItem.style.marginTop = ((image.height + description.offsetHeight) - 21) + 'px';
    } else {
      console.log('b');
      setTimeout(() => {
        likedItem.style.marginTop = '25px';
      }, 750);
    }
  }

  viewOnlyTopCard() {
    return new Promise(resolve => {
      if (this.products.length > 0) {
        for (let i = 0; i < this.products.length - 1; i++) {
          const element = document.getElementById('custom-card-' + i) as HTMLElement;
          element.style.display = 'none';
          if (i === this.products.length - 2) {
            resolve(true);
          }
        }
      } else {
        resolve(false);
      }
    });
  }
}
