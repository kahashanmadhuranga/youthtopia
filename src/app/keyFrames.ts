import {style} from '@angular/animations';

export const fadeOutTopLeft = [
  style({transform: 'rotate3d(0, 0, 0, 0deg)', opacity: '1', offset: .1}),
  style({transform: 'rotate3d(0, 0, 1, 15deg)', right: '70%', marginTop: '5px', opacity: '1', offset: .5}),
  style({transform: 'rotate3d(0, 0, 1, 25deg)', right: '100%', marginTop: '3px', opacity: '0.1', offset: .9}),
];


export const fadeOutTopRight = [
  style({transform: 'rotate3d(0, 0, 0, 0deg)', opacity: '1', offset: .1}),
  style({transform: 'rotate3d(0, 0, 1, -15deg)', left: '70%', marginTop: '5px', opacity: '1', offset: .5}),
  style({transform: 'rotate3d(0, 0, 1, -25deg)', left: '100%', marginTop: '3px', opacity: '0.1', offset: .9}),
];
