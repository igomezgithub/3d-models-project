import { Injectable } from '@angular/core';
import { IMAGES } from './images.json';
import { Image } from './image';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  getImages(): Observable<Image[]> {
    return of(IMAGES);
  }
}
