import {style} from '@angular/animations';

export const fadeOutTopLeft = [
  style({transform: 'rotate3d(0, 0, 0, 0deg)', opacity: '1', offset: .1}),
  style({transform: 'rotate3d(0, 0, 1, 45deg)', right: '50%', marginTop: '5px', opacity: '0', offset: .7}),
  style({transform: 'rotate3d(0, 0, 1, 15deg)', right: '25%', marginTop: '2px', opacity: '0', offset: .9}),
];


export const fadeOutTopRight = [
  style({transform: 'rotate3d(0, 0, 0, 0deg)', opacity: '1', offset: .1}),
  style({transform: 'rotate3d(0, 0, 1, -45deg)', left: '50%', marginTop: '5px', opacity: '0', offset: .9}),
];
