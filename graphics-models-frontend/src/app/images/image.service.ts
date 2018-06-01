import { Injectable } from '@angular/core';
import { IMAGES } from './images.json';
import { Image } from './image';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private urlEndPoint:string = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  getImages(): Observable<Image[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Image[])
  );
  }
}
