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
      transition('* => fadeOutTopLeft', animate(2000, keyframes(kf.fadeOutTopLeft))),
      transition('* => fadeOutTopRight', animate(2000, keyframes(kf.fadeOutTopRight))),
    ])
  ]
})
export class AppComponent implements OnInit {

  animationState: string;
  featuredProducts: Array<any> = [];
  products: Array<any> = [];
  animationStateArray: Array<{ animationState: string }> = [];
  count = 0;

  likedItem: Array<{ image: string, title: string, description: string, id: number }> = [];
  removedItem: Array<{ image: string, title: string, description: string, id: number }> = [];


  constructor(private spinner: NgxSpinnerService) {
  }

  async ngOnInit() {
    this.spinner.show();
    this.featuredProducts = data.featuredProducts;

    await this.setProducts();
    this.getRemovedProjects();
    this.getLikedProject();

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
      this.setRemovedItem(index);
      this.removeCard(index);
    }
  }

  swipeRight(event, state, index, element: HTMLElement) {
    this.anim(index);
    this.resize(index - 1);
    if (!this.animationStateArray[index].animationState) {
      element.style.display = 'block';
      this.animationStateArray[index].animationState = state;
      this.setRemovedItem(index);
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

  setRemovedItem(index) {
    this.removedItem.push(this.products[index]);
    localStorage.setItem('removedItem', JSON.stringify(this.removedItem));
  }

  removeCard(index: number) {
    setTimeout(() => {
      this.animationStateArray.splice(index, 1);
      this.products.splice(index, 1);
    }, 1550);
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

  getLikedProject() {
    console.log('removed');
    if (localStorage.getItem('likedItem')) {
      this.likedItem = JSON.parse(localStorage.getItem('likedItem'));
      this.count = this.likedItem.length;
      console.log(this.removedItem);
    }
  }

  getRemovedProjects() {
    console.log('liked');
    if (localStorage.getItem('removedItem')) {
      this.removedItem = JSON.parse(localStorage.getItem('removedItem'));
      this.removedItem.forEach(item => {
        this.products.splice(this.products.indexOf(item));
      });
      console.log(this.removedItem);
    }
  }

  async reload() {
    localStorage.clear();
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
      }, 1550);
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

  swipeTop(event) {
    event.target.scrollIntoView({inline: 'start', block: 'start', behavior: 'smooth'});
  }

  swipeDown(event) {
    event.target.scrollIntoView({inline: 'end', block: 'end', behavior: 'smooth'});
  }
}
